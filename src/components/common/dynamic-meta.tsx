import type { ParsedScript } from '@/lib/metaHelper'

type DynamicMetaProps = {
  structuredData?: Record<string, unknown>[]
  lineScripts?: ParsedScript[]
}

// Renders admin-authored JSON-LD structured data and extra inline/external
// scripts parsed from a meta row's `other_meta` field. Pair this with
// `parseMetaTags` + `sanitizeMetadata` from `@/lib/metaHelper` on any
// slug-based detail page so it also gets structured-data output.
export default function DynamicMeta({
  structuredData = [],
  lineScripts = [],
}: DynamicMetaProps) {
  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          id={`schema-${index}`}
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      {lineScripts.map((script, index) => {
        if (script.type === 'inline') {
          return (
            <script
              key={`inline-${index}`}
              dangerouslySetInnerHTML={{ __html: script.content }}
              {...(script.async ? { async: true } : {})}
              {...(script.defer ? { defer: true } : {})}
            />
          )
        }

        if (script.type === 'external') {
          return (
            // eslint-disable-next-line @next/next/no-sync-scripts -- admin-authored script; may rely on sync load order
            <script
              key={`external-${index}`}
              src={script.src}
              {...(script.async ? { async: true } : {})}
              {...(script.defer ? { defer: true } : {})}
            />
          )
        }

        return null
      })}
    </>
  )
}
