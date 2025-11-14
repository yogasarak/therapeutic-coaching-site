const rawBase = (process.env.NEXT_PUBLIC_SUPABASE_ASSET_BASE ?? 'https://asgngaofemmqdyjcetkm.supabase.co/storage/v1/object/public/therapeutic%20nexus%20images').trim()

const SUPABASE_ASSET_BASE = rawBase.endsWith('/')
  ? rawBase.slice(0, -1)
  : rawBase

export const LOGO_URL = `${SUPABASE_ASSET_BASE}/logo.png`
export const FAVICON_URL = `${SUPABASE_ASSET_BASE}/favicon.png`
export const HERO_SOCIAL_IMAGE_URL = FAVICON_URL

export default SUPABASE_ASSET_BASE
