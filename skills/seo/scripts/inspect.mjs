// Usage: node inspect.mjs <url>... | node inspect.mjs --sitemap <sitemap-url>
// Fetches each URL as Googlebot would see the raw HTML (no rendering) and prints one JSON line per URL:
// redirect chain, X-Robots-Tag, meta robots, canonical, title, description, H1 count, start of body text,
// <a href> count, robots.txt verdict, issues. Each origin also gets one line: missing-page status and listed sitemaps.
// Filter problems with: | jq 'select(.issues | length > 0)'

const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
const MAX_HOPS = 10
const CONCURRENCY = 6
const BODY_PREVIEW = 120

const get = (url) => fetch(url, { redirect: 'manual', headers: { 'user-agent': UA } })

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
const decode = (s) => s?.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(Number(e.replace(/^#x/i, '0x').replace('#', ''))) : ENTITIES[e.toLowerCase()] ?? m)
const attrs = (tag) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(([, k, ...v]) => [k.toLowerCase(), decode(v.find((x) => x !== undefined))]))
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([t]) => attrs(t))
const text = (s) => s && decode(s.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()

/** Google's robots.txt rules for Googlebot: most specific matching group, longest matching rule, allow wins ties. */
export function robotsVerdict(robotsTxt, path) {
  const groups = []
  let current, inAgents = false
  for (const raw of robotsTxt.split(/\r?\n/)) {
    const [, key, value] = raw.replace(/#.*/, '').match(/^\s*([\w-]+)\s*:\s*(.*?)\s*$/) ?? []
    if (!key) continue
    const k = key.toLowerCase()
    if (k === 'user-agent') {
      if (!inAgents) groups.push(current = { agents: [], rules: [] })
      current.agents.push(value.toLowerCase())
      inAgents = true
    } else if ((k === 'allow' || k === 'disallow') && current) {
      inAgents = false
      if (value) current.rules.push({ allow: k === 'allow', pattern: value })
    } else inAgents = false
  }
  const pick = (agent) => groups.filter((g) => g.agents.includes(agent)).flatMap((g) => g.rules)
  const rules = groups.some((g) => g.agents.includes('googlebot')) ? pick('googlebot') : pick('*')
  const matches = (pattern) => new RegExp('^' + pattern.replace(/[.+?^{}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')).test(path)
  const best = rules.filter((r) => matches(r.pattern))
    .sort((a, b) => b.pattern.length - a.pattern.length || b.allow - a.allow)[0]
  return best ? `${best.allow ? 'allow' : 'disallow'} ${best.pattern}` : 'allow'
}

const robotsCache = new Map()
const robotsFor = (origin) => {
  if (!robotsCache.has(origin)) {
    robotsCache.set(origin, get(`${origin}/robots.txt`).then(async (r) => (r.ok ? r.text() : '')).catch(() => ''))
  }
  return robotsCache.get(origin)
}

async function inspect(url) {
  const chain = []
  let res, at = url
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    res = await get(at)
    chain.push(`${res.status} ${at}`)
    const next = res.headers.get('location')
    if (res.status < 300 || res.status >= 400 || !next) break
    at = new URL(next, at).href
  }
  const html = res.status === 200 && (res.headers.get('content-type') ?? '').includes('html') ? await res.text() : ''
  const headEnd = html.search(/<\/head>/i)
  const head = headEnd < 0 ? html : html.slice(0, headEnd)
  const body = (headEnd < 0 ? html : html.slice(headEnd)).replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, '')
  const { origin, pathname, search } = new URL(at)
  const metaRobots = tags(head, 'meta').filter((m) => /^(robots|googlebot)$/i.test(m.name ?? ''))
    .map((m) => m.content).join(', ') || null
  const canonical = tags(head, 'link').find((l) => /(^|\s)canonical(\s|$)/i.test(l.rel ?? ''))?.href ?? null
  const report = {
    url,
    chain,
    xRobotsTag: res.headers.get('x-robots-tag'),
    metaRobots,
    canonical: canonical && new URL(canonical, at).href,
    title: text(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]) ?? null,
    description: tags(head, 'meta').find((m) => m.name?.toLowerCase() === 'description')?.content ?? null,
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    bodyStart: text(body)?.slice(0, BODY_PREVIEW) || null,
    links: (body.match(/<a\b[^>]*\bhref\s*=/gi) ?? []).length,
    robotsTxt: robotsVerdict(await robotsFor(origin), pathname + search),
  }
  report.issues = [
    res.status !== 200 && `final status ${res.status}`,
    chain.length > 2 && `redirect chain of ${chain.length - 1} hops`,
    /noindex/i.test(`${report.xRobotsTag} ${metaRobots}`) && 'noindex',
    report.robotsTxt.startsWith('disallow') && 'blocked by robots.txt',
    report.canonical && report.canonical !== at && 'canonical points elsewhere',
    html && !report.title && 'missing title',
    html && !report.description && 'missing description',
    html && report.h1Count === 0 && 'no h1 in raw HTML',
    html && !report.bodyStart && 'no body text in raw HTML',
    html && report.links === 0 && 'no <a href> links in raw HTML',
  ].filter(Boolean)
  return report
}

/** Site-wide checks, printed once per origin: soft 404s and the sitemap's listing in robots.txt. */
async function inspectOrigin(origin) {
  const probe = await get(`${origin}/seo-inspect-missing-${Date.now()}`)
  const sitemaps = [...(await robotsFor(origin)).matchAll(/^\s*sitemap\s*:\s*(\S+)/gim)].map(([, s]) => s)
  return {
    origin,
    missingPageStatus: probe.status,
    sitemaps,
    issues: [
      probe.status === 200 && 'missing pages return 200 (soft 404)',
      !sitemaps.length && 'robots.txt lists no sitemap',
    ].filter(Boolean),
  }
}

async function sitemapUrls(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA } })
  if (!res.ok) throw new Error(`sitemap ${url} returned ${res.status}`)
  const xml = await res.text()
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(([, l]) => decode(l))
  if (!/<sitemapindex\b/i.test(xml)) return locs
  return (await Promise.all(locs.map(sitemapUrls))).flat()
}

async function main(args) {
  const urls = args[0] === '--sitemap' ? await sitemapUrls(args[1]) : args
  if (!urls.length) {
    console.error('Usage: node inspect.mjs <url>... | node inspect.mjs --sitemap <sitemap-url>')
    process.exit(1)
  }
  const queue = [...urls]
  const origins = new Set()
  const failed = (e) => [`fetch failed: ${e.cause?.code ?? e.message}`]
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    for (let url; (url = queue.shift());) {
      const { origin } = new URL(url)
      if (!origins.has(origin)) {
        origins.add(origin)
        console.log(JSON.stringify(await inspectOrigin(origin).catch((e) => ({ origin, issues: failed(e) }))))
      }
      console.log(JSON.stringify(await inspect(url).catch((e) => ({ url, issues: failed(e) }))))
    }
  }))
}

if (import.meta.url === `file://${process.argv[1]}`) await main(process.argv.slice(2))
