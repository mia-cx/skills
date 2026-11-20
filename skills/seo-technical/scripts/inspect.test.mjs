import assert from 'node:assert/strict'
import { test } from 'node:test'
import { robotsVerdict } from './inspect.mjs'

const robots = `
User-agent: *
Disallow: /

User-agent: Googlebot
User-agent: Bingbot
Disallow: /private
Allow: /private/press
Disallow: /*.pdf$
`

test('Googlebot follows its own group, not the wildcard group', () => {
  assert.equal(robotsVerdict(robots, '/pricing'), 'allow')
})

test('the longest matching rule wins', () => {
  assert.equal(robotsVerdict(robots, '/private/notes'), 'disallow /private')
  assert.equal(robotsVerdict(robots, '/private/press/kit'), 'allow /private/press')
})

test('wildcards and end anchors match like Google does', () => {
  assert.equal(robotsVerdict(robots, '/docs/guide.pdf'), 'disallow /*.pdf$')
  assert.equal(robotsVerdict(robots, '/docs/guide.pdf?v=2'), 'allow')
})

test('an AI search bot follows its own group, matched case-insensitively', () => {
  const managed = 'User-agent: GPTBot\nDisallow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: *\nDisallow: /'
  assert.equal(robotsVerdict(managed, '/', 'OAI-SearchBot'), 'allow /')
  assert.equal(robotsVerdict(managed, '/', 'GPTBot'), 'disallow /')
})

test('an AI search bot without its own group falls back to the wildcard group', () => {
  assert.equal(robotsVerdict(robots, '/', 'PerplexityBot'), 'disallow /')
})

test('the wildcard group applies when no Googlebot group exists', () => {
  assert.equal(robotsVerdict('User-agent: *\nDisallow: /admin', '/admin/users'), 'disallow /admin')
})
