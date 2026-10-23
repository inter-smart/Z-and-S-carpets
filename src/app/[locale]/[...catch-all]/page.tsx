import { notFound } from 'next/navigation'

// Any path under /[locale] that doesn't match a real route lands here.
// Delegating to notFound() (instead of rendering a page directly) is what lets
// the nested `../not-found.tsx` handle it — with a real 404 status and its
// metadata — rather than this route rendering as a normal 200 page.
export default function CatchAllPage(): never {
  notFound()
}
