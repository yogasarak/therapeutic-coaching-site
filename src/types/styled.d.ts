import 'styled-components'
import { Theme } from './index'

declare module 'styled-components' {
  // styled-components v6 DefaultTheme extension
  export interface DefaultTheme extends Theme {}
}
