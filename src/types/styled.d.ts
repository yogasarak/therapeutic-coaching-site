import 'styled-components'
import { Theme } from './index'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Ensure React types are available for styled-components v5
declare module 'react' {
  export interface FC<P = {}> {
    (props: P, context?: any): React.ReactElement<any, any> | null
    propTypes?: React.WeakValidationMap<P> | undefined
    contextTypes?: React.ValidationMap<any> | undefined
    defaultProps?: Partial<P> | undefined
    displayName?: string | undefined
  }
}