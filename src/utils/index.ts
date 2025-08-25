export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80
    const elementPosition = element.offsetTop - offset
    
    // Use requestAnimationFrame for smoother scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    } else {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, elementPosition)
    }
  }
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const debounce = <T extends ReadonlyArray<unknown>>(
  func: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let timeoutId: NodeJS.Timeout | undefined
  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const throttle = <T extends ReadonlyArray<unknown>>(
  func: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let lastCall = 0
  return (...args: T) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}