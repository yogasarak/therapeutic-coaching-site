export const SUPABASE_IMAGE_BASE_URL =
  'https://asgngaofemmqdyjcetkm.supabase.co/storage/v1/object/public/therapeutic%20nexus%20images'

export const ASSET_URLS = {
  favicon: `${SUPABASE_IMAGE_BASE_URL}/favicon.png`,
  appleTouchIcon: `${SUPABASE_IMAGE_BASE_URL}/favicon.png`,
  safariPinnedTab: '/safari-pinned-tab.svg',
  logo: `${SUPABASE_IMAGE_BASE_URL}/logo.png`,
  socialShare: `${SUPABASE_IMAGE_BASE_URL}/therapeutic-nexus.png`,
} as const

export type AssetKey = keyof typeof ASSET_URLS
