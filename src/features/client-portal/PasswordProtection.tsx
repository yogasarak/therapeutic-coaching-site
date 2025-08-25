'use client'

import React, { useState, useEffect } from 'react'
import {
  ProtectionContainer,
  LoginCard,
  LoginTitle,
  LoginSubtitle,
  LoginForm,
  InputGroup,
  InputLabel,
  PasswordInput,
  LoginButton,
  ErrorMessage,
  HelpText
} from './PasswordProtection.styles'

interface PasswordProtectionProps {
  readonly children?: React.ReactNode
  readonly onAuthenticated: () => void
}
/**
// In a real app, this would be handled by proper authentication
const CLIENT_PASSWORD = 'therapeutic2024'

// Simulate authentication delay
 await new Promise(resolve => setTimeout(resolve, 500))
    if (password === CLIENT_PASSWORD) {
      onAuthenticated()
    } else {
      setError('Invalid password. Please try again.')
    setPassword('')
    }
    setIsLoading(false)
  }
*/
export const PasswordProtection: React.FC<PasswordProtectionProps> = ({
  children,
  onAuthenticated
}) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth')
        const data = await response.json()

        if (data.authenticated) {
          onAuthenticated()
        }
      } catch (error) {
        console.error('Session check failed:', error)
      } finally {
        setIsCheckingSession(false)
      }
    }

    checkSession()
  }, [onAuthenticated])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (data.success) {
        onAuthenticated()
      } else {
        setError(data.error || 'Invalid password. Please try again.')
        setPassword('')
      }
    } catch (error) {
      console.error('Authentication failed:', error)
      setError('Authentication failed. Please try again.')
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    if (error) {
      setError('')
    }
  }

  // Show loading state while checking session
  if (isCheckingSession) {
    return (
      <ProtectionContainer>
        <LoginCard>
          <LoginTitle>Loading...</LoginTitle>
          <LoginSubtitle>Checking your session...</LoginSubtitle>
        </LoginCard>
      </ProtectionContainer>
    )
  }

  return (
    <ProtectionContainer>
      <LoginCard>
        <LoginTitle>Client Portal</LoginTitle>
        <LoginSubtitle>
          Welcome! Please enter your access code to view your personalized content.
        </LoginSubtitle>

        <LoginForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="password">Access Code</InputLabel>
            <PasswordInput
              id="password"
              type="password"
              placeholder="Enter your access code"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </InputGroup>

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          <LoginButton type="submit" disabled={isLoading || !password.trim()}>
            {isLoading ? 'Verifying...' : 'Access Portal'}
          </LoginButton>
        </LoginForm>

        <HelpText>
          Having trouble accessing your portal? Contact your therapeutic coach for assistance.
        </HelpText>
      </LoginCard>
    </ProtectionContainer>
  )
}

export default PasswordProtection