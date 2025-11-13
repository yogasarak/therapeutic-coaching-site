import Link from 'next/link'
import styled from 'styled-components'

export const NavContainer = styled.nav<{ readonly $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  min-height: 60px;
  background-color: ${props =>
    props.$isScrolled
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(255, 255, 255, 0.1)'
  };
  backdrop-filter: ${props => (props.$isScrolled ? 'blur(10px)' : 'none')};
  border-bottom: ${props =>
    props.$isScrolled
      ? `1px solid ${props.theme.colors.border}`
      : 'none'
  };
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (prefers-reduced-motion: reduce) { transition: none; }
  padding: ${props => props.theme.spacing.sm} 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xs} 0;
  }
`

export const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

export const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color 0.2s ease;
  @media (prefers-reduced-motion: reduce) { transition: none; }

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`

export const DesktopNav = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`

export const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: ${props => props.theme.colors.text};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    @media (prefers-reduced-motion: reduce) { transition: none; }
    transform-origin: center;

    &:nth-child(1) {
      margin-bottom: 5px;
    }

    &:nth-child(2) {
      margin-bottom: 5px;
    }
  }
`

export const MobileMenuButtonActive = styled(MobileMenuButton)<{ readonly $isOpen: boolean }>`
  span {
    &:nth-child(1) {
      transform: ${props => (props.$isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none')};
    }

    &:nth-child(2) {
      opacity: ${props => (props.$isOpen ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${props => (props.$isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none')};
    }
  }
`

export const MobileNav = styled.div<{ readonly $isOpen: boolean }>`
  position: fixed;
  top: 60px;
  @supports (top: calc(60px + env(safe-area-inset-top))) {
    top: calc(60px + env(safe-area-inset-top));
  }
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transform: ${props => (props.$isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${props => (props.$isOpen ? '1' : '0')};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (prefers-reduced-motion: reduce) { transition: none; }
  z-index: 999;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`

export const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

export const NavLink = styled.button<{ readonly $isActive: boolean }>`
  background: none;
  border: none;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: ${props => (props.$isActive ? '600' : '400')};
  color: ${props =>
    props.$isActive
      ? props.theme.colors.primary
      : props.theme.colors.text
  };
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs} 0;
  position: relative;
  transition: color 0.2s ease;
  @media (prefers-reduced-motion: reduce) { transition: none; }

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => (props.$isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    @media (prefers-reduced-motion: reduce) { transition: none; }
  }

  &:hover::after {
    width: 100%;
  }
`
