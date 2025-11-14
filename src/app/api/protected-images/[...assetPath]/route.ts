import { NextResponse } from 'next/server'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import path from 'path'
import { Readable } from 'stream'

const ALLOWED_EXTENSIONS = new Map<string, string>([
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.gif', 'image/gif'],
  ['.svg', 'image/svg+xml'],
  ['.pdf', 'application/pdf'],
])

const ASSETS_ROOT = path.join(process.cwd(), 'protected-assets')

export async function GET(
  request: Request,
  { params }: { readonly params: { readonly assetPath?: readonly string[] } },
) {
  const assetSegments = params.assetPath ?? []
  if (assetSegments.length === 0) {
    return NextResponse.json({ message: 'Missing asset path.' }, { status: 400 })
  }

  const incomingToken =
    request.headers.get('x-protected-token') ??
    new URL(request.url).searchParams.get('token')

  if (!process.env.ASSET_ACCESS_TOKEN || incomingToken !== process.env.ASSET_ACCESS_TOKEN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  // Prevent path traversal by resolving and ensuring we stay inside the assets directory.
  const resolvedPath = path.join(ASSETS_ROOT, ...assetSegments)
  if (!resolvedPath.startsWith(ASSETS_ROOT)) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  try {
    const fileStat = await stat(resolvedPath)
    if (!fileStat.isFile()) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
  } catch {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  const extension = path.extname(resolvedPath).toLowerCase()
  const contentType = ALLOWED_EXTENSIONS.get(extension) ?? 'application/octet-stream'

  const fileStream = createReadStream(resolvedPath)
  const webStream = Readable.toWeb(fileStream)

  return new NextResponse(webStream as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'private, max-age=0, must-revalidate',
    },
  })
}
