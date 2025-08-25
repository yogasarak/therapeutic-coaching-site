'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: ${props => 
      'smooth'
    };
    font-size: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 2rem);
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.accent};
    }

    &:focus-visible {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${props => props.theme.borderRadius.sm};
    }
  }

  button {
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus-visible {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${props => props.theme.borderRadius.sm};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    
    &:focus-visible {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }

  img, video, audio {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    padding-left: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.lg} 0;
    font-style: italic;
    color: ${props => props.theme.colors.textMuted};
  }

  pre {
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.md} 0;
    font-size: 0.9em;
  }

  code {
    background-color: ${props => props.theme.colors.surface};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.9em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`

export default GlobalStyles