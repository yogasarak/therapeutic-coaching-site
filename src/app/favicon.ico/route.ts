import { NextResponse } from 'next/server'
import { FAVICON_URL } from '@/config/externalAssets'

export async function GET() {
  const upstream = await fetch(FAVICON_URL, { cache: 'force-cache' })
  if (!upstream.ok) {
    return NextResponse.json({ message: 'Icon not found' }, { status: upstream.status })
  }

  const body = await upstream.arrayBuffer()
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'image/png',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  })
}
