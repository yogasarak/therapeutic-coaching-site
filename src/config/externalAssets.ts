const rawBase = process.env.NEXT_PUBLIC_SUPABASE_ASSET_BASE?.trim()

if (!rawBase) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ASSET_BASE environment variable.')
}

const SUPABASE_ASSET_BASE = rawBase.endsWith('/')
  ? rawBase.slice(0, -1)
  : rawBase

export const LOGO_URL = `${SUPABASE_ASSET_BASE}/logo.png`
export const FAVICON_URL = `${SUPABASE_ASSET_BASE}/favicon.png`
export const HERO_SOCIAL_IMAGE_URL = FAVICON_URL

export default SUPABASE_ASSET_BASE
