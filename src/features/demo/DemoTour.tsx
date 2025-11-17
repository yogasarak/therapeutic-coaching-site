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

  const allSteps = useMemo<ReadonlyArray<TourStep>>(() => [
    {
      id: 'navigation-scroll',
      badge: 'Scroll Intelligence',
      title: 'One-Page Scroll Navigation',
      summary: 'Follow the one-page scroll—engineers see the routing, coaches feel the seamless guidance.',
      bullets: [
        'Coach view: Each section glows in the menu as you scroll, so the narrative feels intuitive start to finish.',
        'Technical: Navigation.tsx throttles scroll listeners and shares a route map across desktop/mobile for zero-jank highlights.',
        'Technical: scrollToSection in @/utils smooth-scrolls and updates history, mixing SPA polish with shareable hashes.',
        'Coach view: Buttons and CTAs reuse that controller, nudging visitors straight to contact without guesswork.',
      ],
      actions: [
        { label: 'Glide to Services', href: '/#services' },
        { label: 'Open Blog', href: '/blog' },
      ],
    },
    {
      id: 'landing',
      badge: 'Coach Onboarding',
      title: 'Landing Experience',
      summary: 'Peek at how the marketing shell pre-renders and sources assets for fast first paint.',
      bullets: [
        'Technical: App Router pre-renders the hero and featured posts using cached frontmatter in src/lib/blog.',
        'Coach view: Hero storytelling, testimonials, and CTAs stay on-brand with shared motion + styling tokens.',
        'Technical: Image/text blocks pull from typed content modules, primed for a headless CMS swap.',
      ],
      actions: [
        { label: 'Jump to Services', href: '/#services' },
        { label: 'View Testimonials', href: '/#testimonials' },
      ],
    },
    {
      id: 'blog-filters',
      badge: 'Content Engine',
      title: 'Blog Filters & Taxonomy',
      summary: 'See how editors and readers move fast—smart filters for engineers, clarity for coaches.',
      bullets: [
        'Coach view: Topic badges, “new” ribbons, and search make it painless to surface the right practice for a client.',
        'Technical: BlogSearchInterface streams the full index server-side, reusing MDX caches for instant filter updates.',
        'Technical: TagFilter and NewContentBadge share one taxonomy map, so editors don’t babysit badge logic.',
        'Coach view: Spotlight cards sit under the same filters—click once, modal opens, and you never lose your place.',
      ],
      actions: [
        { label: 'Go to Blog', href: '/blog' },
        { label: 'Jump to Practice Spotlights', href: '/blog#practice-spotlights' },
      ],
    },
    {
      id: 'blog-audio',
      badge: 'MDX Media',
      title: 'Audio & Modal Workflow',
      summary: 'Audio embeds and modals, ready for both code reviews and coaching sessions.',
      bullets: [
        'Coach view: SoundCloud meditations, transcripts, and calls-to-action live in one modal—share it in session and online.',
        'Technical: MDX shortcodes compile through the cached pipeline in src/lib/blog.ts, so new embeds deploy without rebuild drag.',
        'Technical: sanitize-html + MediaEmbed whitelist external players, keeping the modal hardened and accessibility-friendly.',
        'Coach view: The exact same modal system powers the client portal, keeping experiences consistent across touchpoints.',
      ],
      actions: [
        { label: 'Play the SoundCloud Demo', href: '/blog/meditation-sweet-sweet-steep' },
        { label: 'See Media Components', href: '/blog/meditation-sweet-sweet-steep#listen-in' },
      ],
    },
    {
      id: 'portal',
      badge: 'Client Workspace',
      title: 'Client Portal Demo',
      summary: 'Inspect the dynamic, auth-ready workspace that mirrors the blog experience.',
      bullets: [
        'Coach view: Clients enter a single access code and land in a familiar, uplifting workspace.',
        'Coach view: Use access code `therapeutic2024` to explore this client experience right now.',
        'Technical: PasswordProtection checks /api/auth and guards the workspace behind the shared passphrase `therapeutic2024`.',
        'Technical: Route stays client-side with export const dynamic = "force-dynamic" so auth state is always fresh.',
        'Technical: next.config.mjs applies Cache-Control: no-store to /client-portal, blocking shared caches by design.',
        'Coach view: Homework checklists, practice cards, and audio modals mirror the blog so guidance feels seamless.',
      ],
      actions: [
        { label: 'Open Client Portal', href: '/client-portal' },
      ],
    },
    {
      id: 'under-the-hood',
      badge: 'Tech Stack',
      title: 'Under the Hood',
      summary: 'Highlight the rendering modes, hardening, and build tooling behind the kit.',
      bullets: [
        'Technical: Next.js App Router blends static landing routes, cached MDX renders, and dynamic client data.',
        'Coach view: Performance, accessibility, and motion guardrails make the brand feel polished and trustworthy.',
        'Technical: Hardened CSP/HSTS headers, Jest coverage, and automated sitemap/robots ship with the template.',
        'Coach view: Transparent tooling translates to reliability when pitching clients on this digital experience.',
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

  const steps = useMemo<ReadonlyArray<TourStep>>(
    () => allSteps.filter(step => step.id !== 'landing'),
    [allSteps]
  )

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
