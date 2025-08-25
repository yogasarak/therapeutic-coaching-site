export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '2rem',
        }}>
          <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', color: '#2D5A87' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', color: '#2C3E50' }}>Page Not Found</h2>
          <p style={{ fontSize: '1.1rem', margin: '0 0 2rem 0', color: '#6C757D' }}>
            The page you are looking for does not exist.
          </p>
          <a 
            href="/" 
            style={{
              background: 'linear-gradient(135deg, #2D5A87 0%, #F4A460 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: '600',
              display: 'inline-block',
            }}
          >
            Return Home
          </a>
        </div>
      </body>
    </html>
  )
}