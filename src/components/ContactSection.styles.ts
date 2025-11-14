import styled from 'styled-components'

export const ContactContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.surface};
`

export const ContactContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

export const ContactTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`

export const ContactSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

export const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`

export const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;
  @media (prefers-reduced-motion: reduce) { transition: none; }
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`

export const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;
  @media (prefers-reduced-motion: reduce) { transition: none; }
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`

export const SubmitButton = styled.button<{ readonly $isSubmitting: boolean }>`
  background: linear-gradient(135deg, #FFBF91 0%, #FBCBFF 35%, #FFE3D4 70%, #FFEC8A 100%);
  color: ${props => props.theme.colors.text};
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: ${props => (props.$isSubmitting ? 'not-allowed' : 'pointer')};
  transition: ${props =>
    props.$isSubmitting
      ? 'none'
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'};
  @media (prefers-reduced-motion: reduce) { transition: none; }
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  opacity: ${props => (props.$isSubmitting ? '0.7' : '1')};
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    color: ${props => props.theme.colors.text};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`

export const InfoSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1.3rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.6;
  }
`

export const ContactDetails = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const ContactIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #FFBF91 0%, #FBCBFF 35%, #FFE3D4 70%, #FFEC8A 100%);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  flex-shrink: 0;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  }
`

export const ContactText = styled.div`
  h4 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 2px;
    font-size: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin: 0;
    font-size: 0.9rem;
  }
`

export const StatusMessage = styled.div<{ readonly type: 'success' | 'error' }>`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props =>
    props.type === 'success'
      ? props.theme.colors.success + '20'
      : props.theme.colors.error + '20'
  };
  color: ${props =>
    props.type === 'success'
      ? props.theme.colors.success
      : props.theme.colors.error
  };
  border: 1px solid ${props =>
    props.type === 'success'
      ? props.theme.colors.success
      : props.theme.colors.error
  };
  margin-bottom: ${props => props.theme.spacing.lg};
`
