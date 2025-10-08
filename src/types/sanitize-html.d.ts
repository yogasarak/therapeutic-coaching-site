declare module 'sanitize-html' {
  export type TransformFn = (
    tagName: string,
    attribs: Readonly<Record<string, string>>
  ) => { tagName?: string; attribs?: Readonly<Record<string, string>> }

  export type SanitizeOptions = {
    allowedTags?: readonly string[] | string[]
    allowedAttributes?: Record<string, readonly string[] | string[]>
    allowedSchemes?: readonly string[] | string[]
    transformTags?: Record<string, TransformFn>
    allowedIframeHostnames?: readonly string[] | string[]
  }

  export type Defaults = {
    allowedTags: string[]
    allowedAttributes: Record<string, string[]>
  }

  interface SanitizeHtmlFn {
    (dirty: string, options?: SanitizeOptions): string
    defaults: Defaults
    simpleTransform: (
      tagName: string,
      attributes: Readonly<Record<string, string>>
    ) => TransformFn
  }

  const sanitizeHtml: SanitizeHtmlFn
  export default sanitizeHtml
}
