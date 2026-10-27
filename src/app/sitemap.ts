import { routing } from '@/i18n/routing'
import { getBlogsData } from '@/lib/api/blogs'
import { getProductsData } from '@/lib/api/products'
import { getWorksData } from '@/lib/api/works'
import type { BlogListData } from '@/types/blog'
import type { ProductListData } from '@/types/product-list'
import type { WorkListData } from '@/types/work'
import type { MetadataRoute } from 'next'

// Regenerated in the background at most once an hour, so new products / posts / projects
// reach crawlers without a redeploy
export const revalidate = 3600

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/$/, '')

// Indexable pages with no dynamic segment ('' = home). The quote cart (/quotes, noindex) and
// the 404 are left out on purpose.
const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/products', priority: 0.9 },
  { path: '/category', priority: 0.8 },
  { path: '/services', priority: 0.8 },
  { path: '/works', priority: 0.7 },
  { path: '/blogs', priority: 0.7 },
  { path: '/about', priority: 0.6 },
  { path: '/contact', priority: 0.6 },
  { path: '/downloads', priority: 0.5 },
  { path: '/quotes/form', priority: 0.6 },
  { path: '/privacy-policy', priority: 0.2 },
]

// every list endpoint caps `limit` (products / blogs 120, projects 12)
const PAGE_SIZE = { products: 120, blogs: 120, works: 12 }
// safety net against a runaway pagination loop
const MAX_PAGES = 100

type Paged<T> = {
  success: boolean
  data: { items: T[]; hasMore: boolean } | null
}

// Walks every page of a list endpoint. Returns whatever was collected if a page fails, so a
// flaky API degrades the sitemap instead of breaking it.
async function collect<T>(
  fetchPage: (page: number) => Promise<Paged<T>>,
): Promise<T[]> {
  const all: T[] = []
  for (let page = 1; page <= MAX_PAGES; page++) {
    const result = await fetchPage(page)
    if (!result.success || !result.data) break
    all.push(...result.data.items)
    if (!result.data.hasMore) break
  }
  return all
}

// One <url> per locale, each carrying the hreflang alternates for all locales
function entry(
  path: string,
  extra: Omit<MetadataRoute.Sitemap[number], 'url'> = {},
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  )
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    alternates: { languages },
    ...extra,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogs, works] = await Promise.all([
    collect(async (page) => {
      const r = await getProductsData.getList<ProductListData>({
        page: String(page),
        limit: String(PAGE_SIZE.products),
      })
      return {
        success: r.success,
        data: r.success
          ? { items: r.data.products, hasMore: r.data.pagination.hasMore }
          : null,
      }
    }),
    collect(async (page) => {
      const r = await getBlogsData.getList<BlogListData>({
        page: String(page),
        limit: String(PAGE_SIZE.blogs),
      })
      return {
        success: r.success,
        data: r.success
          ? { items: r.data.blogs, hasMore: r.data.pagination.hasMore }
          : null,
      }
    }),
    collect(async (page) => {
      const r = await getWorksData.getWorkList<WorkListData>({
        page: String(page),
        limit: String(PAGE_SIZE.works),
      })
      return {
        success: r.success,
        data: r.success
          ? { items: r.data.projects, hasMore: r.data.pagination.hasMore }
          : null,
      }
    }),
  ])

  return [
    ...STATIC_PAGES.flatMap(({ path, priority }) =>
      entry(path, { changeFrequency: 'weekly', priority }),
    ),
    ...products.flatMap((p) =>
      entry(`/products/${encodeURIComponent(p.slug)}`, {
        changeFrequency: 'weekly',
        priority: 0.8,
      }),
    ),
    ...blogs.flatMap((b) =>
      entry(`/blogs/${encodeURIComponent(b.slug)}`, {
        lastModified: b.published_at ? new Date(b.published_at) : undefined,
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ),
    ...works.flatMap((w) =>
      entry(`/works/${encodeURIComponent(w.slug)}`, {
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ),
  ]
}
