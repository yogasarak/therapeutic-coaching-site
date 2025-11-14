'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ActionsRow,
  FooterButton,
  FooterControls,
  ModalFooterRow,
  StepBadge,
  StepDescription,
  StepHeader,
  StepList,
  StepListItem,
  StepProgress,
  StepTitle,
  TourButton,
  TourContainer,
  TourContent,
  TourPrompt,
  TourButtonWrapper,
  Sparkle,
  ActionLink,
} from './DemoTour.styles'
import Modal from '@/features/modal/Modal'

type TourAction = {
  readonly label: string
  readonly href: string
  readonly target?: '_blank' | '_self'
  readonly rel?: string
  readonly external?: boolean
}

type TourStep = {
  readonly id: string
  readonly badge: string
  readonly title: string
  readonly summary: string
  readonly bullets: ReadonlyArray<string>
  readonly actions?: ReadonlyArray<TourAction>
}

const TOUR_PROMPT_STORAGE_KEY = 'demo-tour-dismissed'

const DemoTour: React.FC = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    let timer: number | undefined
    try {
      const dismissed = window.localStorage.getItem(TOUR_PROMPT_STORAGE_KEY) === 'true'
      if (!dismissed) {
        timer = window.setTimeout(() => {
          setShowPrompt(true)
        }, 2500)
      }
    } catch {
      setShowPrompt(true)
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer)
      }
    }
  }, [])

  const steps = useMemo<ReadonlyArray<TourStep>>(() => [
    {
      id: 'landing',
      badge: 'Coach Onboarding',
      title: 'Landing Experience',
      summary: 'See how the marketing shell supports coaches evaluating this kit.',
      bullets: [
        'Hero, story, services, testimonials, and contact blocks share a consistent theme + motion.',
        'Primary CTA scrolls smoothly using the shared navigation controller.',
        'Sections reuse the same styled-components tokens to stay on-brand.',
      ],
      actions: [
        { label: 'Jump to Services', href: '/#services' },
        { label: 'View Testimonials', href: '/#testimonials' },
      ],
    },
    {
      id: 'blog',
      badge: 'Content Engine',
      title: 'Interactive Blog',
      summary: 'Review the MDX blog experience a coach would co-author.',
      bullets: [
        'Search, topic badges, and canonicalized audio tags showcase consumer-grade filtering.',
        'Preview practice spotlights from the same interface—each opens in a modal instead of a standalone MDX page.',
        'Open any article to see synchronized text/audio playback and MDX-triggered modals.',
        'Content sanitization + modal enhancer keep rich embeds safe.',
      ],
      actions: [
        { label: 'Go to Blog', href: '/blog' },
        { label: 'Jump to Practice Spotlights', href: '/blog#practice-spotlights' },
      ],
    },
    {
      id: 'portal',
      badge: 'Client Workspace',
      title: 'Client Portal Demo',
      summary: 'Walk through the gated workspace clients would receive.',
      bullets: [
        'Launch the live demo: therapeutic-coaching-site.vercel.app/client-portal.',
        'Authenticate with the demo access code: therapeutic2024',
        'Review personalized practice cards, homework tracking, and spotlight modal flows—all rendered via modal overlays to mirror the blog experience.',
        'Modal infrastructure mirrors the blog for consistent UX.',
      ],
      actions: [
        { label: 'Open Client Portal', href: '/client-portal' },
      ],
    },
    {
      id: 'under-the-hood',
      badge: 'Tech Stack',
      title: 'Under the Hood',
      summary: 'Highlight the engineering depth that powers the kit.',
      bullets: [
        'Next.js App Router, server actions, hardened CSP/HSTS, and sitemap/robots automation.',
        'MDX pipeline with cached frontmatter, sanitize rules, and Jest coverage.',
        'Styled-components SSR registry, theme tokens, and reusable utility helpers.',
      ],
      actions: [
        {
          label: 'View GitHub Repo',
          href: 'https://github.com/yogasarak/therapeutic-coaching-site',
          target: '_blank',
          rel: 'noopener noreferrer',
          external: true,
        },
      ],
    },
  ], [])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setActiveStep(0)
    setShowPrompt(false)
    setHasOpened(true)
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(TOUR_PROMPT_STORAGE_KEY, 'true')
      }
    } catch {
      // ignore
    }
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveStep(prev => Math.max(prev - 1, 0))
  }, [])

  const handleNext = useCallback(() => {
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const currentStep = steps[activeStep]

  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === steps.length - 1
  const showSparkles = !hasOpened

  const sparkles = useMemo(
    () => [
      { id: 'sparkle-top-right', style: { top: '-18px', right: '-10px' }, delay: 0, duration: 1.8 },
      { id: 'sparkle-top-left', style: { top: '-12px', left: '-16px' }, delay: 0.4, duration: 2 },
      { id: 'sparkle-right', style: { top: '18px', right: '-22px' }, delay: 0.8, duration: 2.2 },
      { id: 'sparkle-left', style: { bottom: '10px', left: '-26px' }, delay: 1.2, duration: 2 },
      { id: 'sparkle-bottom', style: { bottom: '-18px', right: '46px' }, delay: 1.6, duration: 1.9 },
      { id: 'sparkle-bottom-left', style: { bottom: '-12px', left: '12px' }, delay: 2, duration: 2.3 },
    ],
    []
  )

  return (
    <>
      <TourContainer>
        {showPrompt && (
          <TourPrompt>
            Take a quick tour to see how coaches and clients experience this UI kit and grab the repo + live demos.
          </TourPrompt>
        )}
        <TourButtonWrapper>
          {showSparkles && sparkles.map(sparkle => (
            <Sparkle
              key={sparkle.id}
              $delay={sparkle.delay}
              $duration={sparkle.duration}
              style={sparkle.style}
              aria-hidden="true"
            >
              ✨
            </Sparkle>
          ))}
          <TourButton type="button" onClick={handleOpen} aria-haspopup="dialog">
            Guided Tour
          </TourButton>
        </TourButtonWrapper>
      </TourContainer>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Product Tour"
        footer={(
          <ModalFooterRow>
            <StepProgress>
              Step {activeStep + 1} of {steps.length}
            </StepProgress>
            <FooterControls>
              {!isFirstStep && (
                <FooterButton type="button" onClick={handlePrev} $variant="ghost">
                  Previous
                </FooterButton>
              )}
              <FooterButton
                type="button"
                onClick={isLastStep ? handleClose : handleNext}
                $variant="primary"
              >
                {isLastStep ? 'Done' : 'Next'}
              </FooterButton>
            </FooterControls>
          </ModalFooterRow>
        )}
      >
        <TourContent>
          <StepHeader>
            <StepBadge>{currentStep.badge}</StepBadge>
            <StepTitle>{currentStep.title}</StepTitle>
            <StepDescription>
              {currentStep.summary}
            </StepDescription>
          </StepHeader>

          <StepList>
            {currentStep.bullets.map(item => (
              <StepListItem key={item}>{item}</StepListItem>
            ))}
          </StepList>

          {currentStep.actions && currentStep.actions.length > 0 && (
            <ActionsRow>
              {currentStep.actions.map(action => (
                <ActionLink
                  key={action.label}
                  href={action.href}
                  onClick={event => {
                    if (!action.external) {
                      event.preventDefault()
                      router.push(action.href)
                    }
                    handleClose()
                  }}
                  target={action.target}
                  rel={action.rel}
                >
                  {action.label}
                </ActionLink>
              ))}
            </ActionsRow>
          )}
        </TourContent>
      </Modal>
    </>
  )
}

export default DemoTour
