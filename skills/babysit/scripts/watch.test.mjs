import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const watcher = fileURLToPath(new URL('./watch.sh', import.meta.url))
const clean = () => ({
  pr: {
    state: 'OPEN', headRefOid: 'current', mergeable: 'MERGEABLE', reviewDecision: '',
    statusCheckRollup: [
      { name: 'CI', status: 'COMPLETED', conclusion: 'SUCCESS' },
      { name: 'pullfrog', status: 'COMPLETED', conclusion: 'SUCCESS' },
    ],
  },
  reviews: [{
    id: 1, user: { login: 'pullfrog[bot]' }, commit_id: 'current', state: 'COMMENTED',
    body: '> ✅ No new issues found.', submitted_at: '2099-09-05T00:00:00Z',
  }],
  threads: { data: { repository: { pullRequest: {
    headRefOid: 'current',
    reviewThreads: { pageInfo: { hasNextPage: false }, nodes: [] },
  } } } },
})

function run(fixture, once = true) {
  const dir = mkdtempSync(join(tmpdir(), 'babysit-test-'))
  try {
    // Only the fake gh is reachable through this test's PATH. No GitHub requests or writes.
    writeFileSync(join(dir, 'gh'), `#!/usr/bin/env node
const args = process.argv.slice(2)
const fixture = JSON.parse(process.env.BABYSIT_FIXTURE)
if (args[0] === 'auth') process.exit(0)
if (args[0] === 'pr') console.log(JSON.stringify(fixture.pr))
else if (args.includes('graphql')) console.log(JSON.stringify(fixture.threads))
else if (args.some(arg => arg.endsWith('/reviews'))) console.log(JSON.stringify([fixture.reviews]))
`, { mode: 0o755 })
    const result = spawnSync('bash', [watcher, 'owner/repo', '1', ...(once ? ['--once'] : [])], {
      encoding: 'utf8', timeout: 2000,
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, TMPDIR: dir,
        BABYSIT_FIXTURE: JSON.stringify(fixture) },
    })
    assert.equal(result.status, 0, result.stderr || result.error?.message)
    return { output: result.stdout, state: existsSync(join(dir, 'babysit-owner-repo-1')) }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

test('clean current-head Pullfrog and green CI terminate both modes after reporting the final review', () => {
  for (const once of [false, true]) {
    assert.deepEqual(run(clean(), once), {
      output: 'review 1 pullfrog[bot] COMMENTED\ngreen current\n', state: false,
    })
  }
})

test('success means a clean review, not merely a completed workflow', () => {
  for (const change of [
    f => { f.reviews[0].body = 'Found a draft-state bug.' },
    f => { f.reviews[0].commit_id = 'old' },
    f => { f.reviews = [] },
    f => { f.reviews.push({ ...f.reviews[0], id: 2, body: 'Found a bug.', submitted_at: '2099-09-05T01:00:00Z' }) },
  ]) {
    const fixture = clean()
    change(fixture)
    const result = run(fixture)
    assert.doesNotMatch(result.output, /^green /m)
    assert.equal(result.state, true)
  }
})

test('pending checks, merge blockers, and unresolved or incomplete discussions keep the watch open', () => {
  for (const change of [
    f => { f.pr.statusCheckRollup[0] = { name: 'CI', status: 'IN_PROGRESS' } },
    f => { f.pr.statusCheckRollup[0].conclusion = 'FAILURE' },
    f => { f.pr.mergeable = 'CONFLICTING' },
    f => { f.pr.reviewDecision = 'CHANGES_REQUESTED' },
    f => { f.threads.data.repository.pullRequest.reviewThreads.nodes = [{ isResolved: false }] },
    f => { f.threads.data.repository.pullRequest.reviewThreads.pageInfo.hasNextPage = true },
    f => { f.threads.data.repository.pullRequest.headRefOid = 'newer' },
    f => { f.threads = { errors: [{ message: 'unavailable' }] } },
  ]) {
    const fixture = clean()
    change(fixture)
    assert.doesNotMatch(run(fixture).output, /^green /m)
  }
})
