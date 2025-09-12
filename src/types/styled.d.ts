import 'styled-components'
import { Theme } from './index'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Keep React types from @types/react; no augmentation required
