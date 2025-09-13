import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// In production, this should be stored in a secure database
// with proper hashing (bcrypt, scrypt, etc.)
const CLIENT_PASSWORD = process.env.CLIENT_PORTAL_PASSWORD || 'therapeutic2024'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // In production, use proper password hashing comparison
    if (password !== CLIENT_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create a secure session token
    const sessionToken = generateSessionToken()
    const expiresAt = new Date(Date.now() + SESSION_DURATION)

    // Set HTTP-only cookie for security
    const cookieStore = await cookies()
    cookieStore.set('client-session', sessionToken, {
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/client-portal'
    })

    return NextResponse.json({ 
      success: true,
      expiresAt: expiresAt.toISOString()
    })

  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('client-session')

    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false })
    }

    // In production, validate the session token against a database
    // For now, we just check if the cookie exists
    return NextResponse.json({ authenticated: true })

  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('client-session')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}

// Simple session token generator
// In production, use crypto.randomBytes or a proper JWT library
function generateSessionToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}