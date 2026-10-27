import clientNamespaces from './client-namespaces.json'

type Messages = Record<string, unknown>

// next-intl serialises everything passed to NextIntlClientProvider into every page's
// HTML, so only the namespaces read by `useTranslations` are sent (server components use
// their own `getTranslations`, which doesn't depend on this). When a client component
// starts using a new namespace, add it to `client-namespaces.json` —
// `npm run check:i18n` lists any that are missing.
export function pickClientMessages(messages: Messages): Messages {
  const picked: Messages = {}

  for (const namespace of clientNamespaces.namespaces) {
    const path = namespace.split('.')
    let source: unknown = messages
    let target = picked

    for (let i = 0; i < path.length; i++) {
      const key = path[i]
      if (typeof source !== 'object' || source === null || !(key in source)) break
      source = (source as Messages)[key]

      if (i === path.length - 1) {
        target[key] = source
      } else {
        target = (target[key] ??= {}) as Messages
      }
    }
  }

  return picked
}
