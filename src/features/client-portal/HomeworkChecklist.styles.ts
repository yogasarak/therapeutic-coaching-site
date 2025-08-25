import styled from 'styled-components'

export const ChecklistContainer = styled.div<{ readonly $isCompleted: boolean }>`
  background: ${props => props.theme.colors.surface || props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  border: 2px solid ${props => 
    props.$isCompleted 
      ? 'rgba(76, 175, 80, 0.3)' 
      : props.theme.colors.border
  };
  box-shadow: ${props => 
    props.$isCompleted 
      ? '0 4px 16px rgba(76, 175, 80, 0.1)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)'
  };
  transition: all 0.3s ease;
  position: relative;
  
  ${props => props.$isCompleted && `
    background: linear-gradient(135deg, 
      rgba(76, 175, 80, 0.05) 0%, 
      rgba(76, 175, 80, 0.02) 100%
    );
  `}
`

export const ChecklistHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
`

export const ChecklistTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.secondary};
`

export const ChecklistSubtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
`

export const CompletedBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
`

export const ChecklistContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ChecklistItem = styled.div<{ readonly $completed: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: pointer;
  
  ${props => props.$completed ? `
    background: rgba(76, 175, 80, 0.05);
    border: 1px solid rgba(76, 175, 80, 0.2);
  ` : `
    background: transparent;
    border: 1px solid transparent;
    
    &:hover {
      background: ${props.theme.colors.surface || 'rgba(0, 0, 0, 0.02)'};
      border-color: ${props.theme.colors.border};
    }
  `}
`

export const CheckboxWrapper = styled.div`
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Checkbox = styled.div<{ readonly $checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => 
    props.$checked ? '#4CAF50' : props.theme.colors.border
  };
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: ${props => props.$checked ? '#4CAF50' : 'transparent'};
  
  &:hover {
    border-color: ${props => props.$checked ? '#45A049' : props.theme.colors.primary};
    transform: scale(1.1);
  }
`

export const CheckboxIcon = styled.span<{ readonly $checked: boolean }>`
  color: white;
  font-size: 12px;
  font-weight: bold;
  opacity: ${props => props.$checked ? 1 : 0};
  transition: opacity 0.2s ease;
`

export const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const ItemTitle = styled.h4<{ readonly $completed: boolean }>`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  opacity: ${props => props.$completed ? 0.7 : 1};
  transition: all 0.2s ease;
`

export const ItemDescription = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.4;
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: 0.5rem;
`

export const ProgressFill = styled.div<{ readonly $percentage: number }>`
  width: ${props => props.$percentage}%;
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #66BB6A);
  border-radius: ${props => props.theme.borderRadius.full};
  transition: width 0.3s ease;
`

export const ProgressText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
`