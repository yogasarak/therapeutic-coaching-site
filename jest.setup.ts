import '@testing-library/jest-dom'

// RAF polyfills for jsdom
if (!(global as any).requestAnimationFrame) {
  ;(global as any).requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(() => cb(Date.now()), 0) as unknown as number
}
if (!(global as any).cancelAnimationFrame) {
  ;(global as any).cancelAnimationFrame = (id: number) =>
    clearTimeout(id as unknown as NodeJS.Timeout)
}

// TextEncoder/TextDecoder for libs that rely on them in tests
try {
  const { TextEncoder, TextDecoder } = require('util')
  if (!(global as any).TextEncoder) {
    ;(global as any).TextEncoder = TextEncoder
  }
  if (!(global as any).TextDecoder) {
    ;(global as any).TextDecoder = TextDecoder
  }
} catch {}

// matchMedia mock to avoid errors from components checking it
if (!(window as any).matchMedia) {
  ;(window as any).matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
    media: '',
  })
}
