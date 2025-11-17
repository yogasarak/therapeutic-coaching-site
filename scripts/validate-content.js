const fs = require('fs')
const path = require('path')

const blogDir = path.join(process.cwd(), 'src/content/blog')
const publicDir = path.join(process.cwd(), 'public')
const allowedHosts = new Set([
  'w.soundcloud.com',
  'player.soundcloud.com',
  'soundcloud.com',
  'www.youtube.com',
  'player.vimeo.com',
  'asgngaofemmqdyjcetkm.supabase.co',
])

const assetPattern = /<(?:img|source)\s+[^>]*src="([^"]+)"|<iframe\s+[^>]*src="([^"]+)"|\bhref="([^"]+)"/g

function validateAsset(url, filePath, issues) {
  if (!url) return
  if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) return

  if (url.startsWith('/')) {
    const absolute = path.join(publicDir, url)
    if (!fs.existsSync(absolute)) {
      issues.push({ type: 'missing-local', filePath, url })
    }
    return
  }

  try {
    const { hostname } = new URL(url)
    if (!allowedHosts.has(hostname)) {
      issues.push({ type: 'disallowed-host', filePath, url })
    }
  } catch {
    issues.push({ type: 'invalid-url', filePath, url })
  }
}

function validateFile(filePath, issues) {
  const contents = fs.readFileSync(filePath, 'utf8')
  let match
  while ((match = assetPattern.exec(contents)) !== null) {
    const url = match[1] || match[2] || match[3]
    validateAsset(url, filePath, issues)
  }

  const trackUrlPattern = /\btrackUrl="([^"]+)"/g
  while ((match = trackUrlPattern.exec(contents)) !== null) {
    validateAsset(match[1], filePath, issues)
  }

  const playerSrcPattern = /\bplayerSrc="([^"]+)"/g
  while ((match = playerSrcPattern.exec(contents)) !== null) {
    validateAsset(match[1], filePath, issues)
  }
}

function main() {
  if (!fs.existsSync(blogDir)) return
  const issues = []
  for (const file of fs.readdirSync(blogDir)) {
    if (!file.endsWith('.mdx')) continue
    validateFile(path.join(blogDir, file), issues)
  }

  if (issues.length > 0) {
    console.error('Content validation failed:')
    for (const issue of issues) {
      console.error(` - [${issue.type}] ${issue.filePath} => ${issue.url}`)
    }
    process.exitCode = 1
  } else {
    console.log('Content validation passed.')
  }
}

main()
