export type ParsedOtherMeta = {
  other: Record<string, string>
  scripts: Record<string, unknown>[]
}

// Parses admin-authored raw HTML (a string stored in the DB, e.g.
// "<meta property=... content=...><script type='application/ld+json'>...</script>")
// into a plain object of {name|property|http-equiv: content} plus any JSON-LD <script> blocks.
export function parseOtherMeta(htmlString?: string | null): ParsedOtherMeta {
  if (!htmlString || htmlString.trim() === '') {
    return { other: {}, scripts: [] }
  }

  const other: Record<string, string> = {}
  const scripts: Record<string, unknown>[] = []

  const metaRegex = /<meta\s+([^>]+)>/gi
  let match: RegExpExecArray | null

  while ((match = metaRegex.exec(htmlString)) !== null) {
    const attributes = match[1]

    const nameMatch = attributes.match(/name=["']([^"']+)["']/i)
    const propertyMatch = attributes.match(/property=["']([^"']+)["']/i)
    const httpEquivMatch = attributes.match(/http-equiv=["']([^"']+)["']/i)
    const contentMatch = attributes.match(/content=["']([^"']+)["']/i)

    const content = contentMatch ? contentMatch[1] : ''

    if (nameMatch) {
      other[nameMatch[1]] = content
    } else if (propertyMatch) {
      other[propertyMatch[1]] = content
    } else if (httpEquivMatch) {
      other[httpEquivMatch[1]] = content
    }
  }

  const scriptRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let scriptMatch: RegExpExecArray | null

  while ((scriptMatch = scriptRegex.exec(htmlString)) !== null) {
    try {
      const jsonContent = scriptMatch[1].trim()
      scripts.push(JSON.parse(jsonContent))
    } catch {
      // ignore malformed JSON-LD block
    }
  }

  return { other, scripts }
}

export type ParsedLinkTag = {
  rel: string
  href: string
  hreflang?: string
  type?: string
  sizes?: string
  media?: string
  as?: string
  crossOrigin?: string
}

export type ParsedInlineScript = {
  type: 'inline'
  content: string
  attributes: string
  async?: boolean
  defer?: boolean
  scriptType?: string
}

export type ParsedExternalScript = {
  type: 'external'
  src: string
  content: null
  async?: boolean
  defer?: boolean
}

export type ParsedScript = ParsedInlineScript | ParsedExternalScript

export type ParsedMetaTags = {
  other: Record<string, string>
  links: ParsedLinkTag[]
  scripts: Record<string, unknown>[]
  inlineScripts: ParsedScript[]
}

// Fuller parser used by slug-based detail pages: extracts meta tags, <link> tags,
// JSON-LD <script> blocks (structured data), and other inline/external <script> tags
// from the same kind of admin-authored "other_meta" HTML string.
export function parseMetaTags(htmlString?: string | null): ParsedMetaTags {
  if (!htmlString || htmlString.trim() === '') {
    return { other: {}, links: [], scripts: [], inlineScripts: [] }
  }

  const other: Record<string, string> = {}
  const links: ParsedLinkTag[] = []
  const scripts: Record<string, unknown>[] = []
  const inlineScripts: ParsedScript[] = []

  try {
    // 1. Meta tags
    const metaRegex = /<meta\s+([^>]+?)>/gi
    let metaMatch: RegExpExecArray | null

    while ((metaMatch = metaRegex.exec(htmlString)) !== null) {
      const attributes = metaMatch[1]

      const nameMatch = attributes.match(/name\s*=\s*["']([^"']+)["']/i)
      const propertyMatch = attributes.match(/property\s*=\s*["']([^"']+)["']/i)
      const httpEquivMatch = attributes.match(
        /http-equiv\s*=\s*["']([^"']+)["']/i,
      )
      const charsetMatch = attributes.match(
        /charset\s*=\s*["']?([^"'\s>]+)["']?/i,
      )
      const contentMatch = attributes.match(/content\s*=\s*["']([^"']*)["']/i)
      const itemPropMatch = attributes.match(/itemprop\s*=\s*["']([^"']+)["']/i)

      const content = contentMatch ? contentMatch[1] : ''

      if (charsetMatch) {
        other['charset'] = charsetMatch[1]
      } else if (nameMatch) {
        other[nameMatch[1]] = content
      } else if (propertyMatch) {
        other[propertyMatch[1]] = content
      } else if (httpEquivMatch) {
        other[httpEquivMatch[1]] = content
      } else if (itemPropMatch) {
        other[`itemprop:${itemPropMatch[1]}`] = content
      }
    }

    // 2. Link tags
    const linkRegex = /<link\s+([^>]+?)>/gi
    let linkMatch: RegExpExecArray | null

    while ((linkMatch = linkRegex.exec(htmlString)) !== null) {
      const attributes = linkMatch[1]

      const relMatch = attributes.match(/rel\s*=\s*["']([^"']+)["']/i)
      const hrefMatch = attributes.match(/href\s*=\s*["']([^"']+)["']/i)
      const hreflangMatch = attributes.match(/hreflang\s*=\s*["']([^"']+)["']/i)
      const typeMatch = attributes.match(/type\s*=\s*["']([^"']+)["']/i)
      const sizesMatch = attributes.match(/sizes\s*=\s*["']([^"']+)["']/i)
      const mediaMatch = attributes.match(/media\s*=\s*["']([^"']+)["']/i)
      const asMatch = attributes.match(/as\s*=\s*["']([^"']+)["']/i)
      const crossoriginMatch = attributes.match(
        /crossorigin\s*=\s*["']([^"']+)["']/i,
      )

      if (relMatch && hrefMatch) {
        const linkObj: ParsedLinkTag = { rel: relMatch[1], href: hrefMatch[1] }

        if (hreflangMatch) linkObj.hreflang = hreflangMatch[1]
        if (typeMatch) linkObj.type = typeMatch[1]
        if (sizesMatch) linkObj.sizes = sizesMatch[1]
        if (mediaMatch) linkObj.media = mediaMatch[1]
        if (asMatch) linkObj.as = asMatch[1]
        if (crossoriginMatch) linkObj.crossOrigin = crossoriginMatch[1]

        links.push(linkObj)
      }
    }

    // 3a. JSON-LD scripts
    const jsonLdRegex =
      /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    let jsonLdMatch: RegExpExecArray | null

    while ((jsonLdMatch = jsonLdRegex.exec(htmlString)) !== null) {
      try {
        const jsonContent = jsonLdMatch[1].trim()
        const cleanedJson = jsonContent.replace(/<!--[\s\S]*?-->/g, '')
        scripts.push(JSON.parse(cleanedJson))
      } catch (error) {
        console.warn(
          'Failed to parse JSON-LD script:',
          (error as Error).message,
        )
      }
    }

    // 3b. External scripts (with src attribute)
    const externalScriptRegex =
      /<script[^>]*src\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/gi
    let externalMatch: RegExpExecArray | null

    while ((externalMatch = externalScriptRegex.exec(htmlString)) !== null) {
      const src = externalMatch[1]
      if (src) {
        inlineScripts.push({ type: 'external', src, content: null })
      }
    }

    // 3c. Inline scripts (not JSON-LD, not external)
    const inlineScriptRegex =
      /<script(?![^>]*type\s*=\s*["']application\/ld\+json["'])(?![^>]*src\s*=)([^>]*)>([\s\S]*?)<\/script>/gi
    let inlineMatch: RegExpExecArray | null

    while ((inlineMatch = inlineScriptRegex.exec(htmlString)) !== null) {
      const attributes = inlineMatch[1]
      const scriptContent = inlineMatch[2].trim()

      if (scriptContent) {
        const scriptObj: ParsedInlineScript = {
          type: 'inline',
          content: scriptContent,
          attributes: attributes.trim(),
        }

        if (/async/i.test(attributes)) scriptObj.async = true
        if (/defer/i.test(attributes)) scriptObj.defer = true
        const typeMatch = attributes.match(/type\s*=\s*["']([^"']+)["']/i)
        if (typeMatch) scriptObj.scriptType = typeMatch[1]

        inlineScripts.push(scriptObj)
      }
    }

    return { other, links, scripts, inlineScripts }
  } catch (error) {
    console.error('Error parsing meta tags:', error)
    return { other: {}, links: [], scripts: [], inlineScripts: [] }
  }
}

// Sanitizes the output of parseMetaTags before it is rendered via dangerouslySetInnerHTML.
// NEVER skip this step — other_meta is admin-entered HTML.
export function sanitizeMetadata(parsedMeta: ParsedMetaTags): ParsedMetaTags {
  const { other, links, scripts, inlineScripts } = parsedMeta

  const reservedMetaTags = ['viewport', 'charset']

  const sanitizedOther: Record<string, string> = {}
  Object.keys(other).forEach((key) => {
    if (!reservedMetaTags.includes(key.toLowerCase())) {
      sanitizedOther[key] = other[key]
    }
  })

  const sanitizedLinks = links.filter((link) => {
    try {
      return (
        link.href.startsWith('http') ||
        link.href.startsWith('https') ||
        link.href.startsWith('/')
      )
    } catch {
      return false
    }
  })

  // Inline scripts can be dangerous — only allow if the admin source is fully trusted.
  const sanitizedInlineScripts = inlineScripts.filter((script) => {
    if (script.type === 'inline') {
      const dangerousPatterns = [
        /eval\s*\(/gi,
        /Function\s*\(/gi,
        /document\.write/gi,
        /<iframe/gi,
      ]
      const isDangerous = dangerousPatterns.some((pattern) =>
        pattern.test(script.content),
      )

      if (isDangerous) {
        console.warn(
          'Blocked potentially dangerous inline script:',
          script.content,
        )
        return false
      }
    }
    return true
  })

  return {
    other: sanitizedOther,
    links: sanitizedLinks,
    scripts,
    inlineScripts: sanitizedInlineScripts,
  }
}
