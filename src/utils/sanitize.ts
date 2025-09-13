import DOMPurify from 'dompurify'

// Client-side only sanitization helper
export const sanitizeHTML = (html: string): string => {
  // Only sanitize on the client side
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(html)
  }
  
  // On server side, perform basic escaping for safety
  // This is a fallback - ideally, content should be trusted at build time
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// For trusted content that doesn't need sanitization
export const trustHTML = (html: string): string => {
  return html
}