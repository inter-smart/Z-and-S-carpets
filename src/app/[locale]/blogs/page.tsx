import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import BlogListSection from '@/components/pages/blogs/blog-list.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import type { LocaleType } from '@/i18n/types'
import { getBlogsData } from '@/lib/api/blogs'
import { getMetaData } from '@/lib/api/metaApi'
import {
  BLOGS_PAGE_LIMIT,
  buildBlogQuery,
  parseSlugs,
  parseSort,
  sanitizePage,
} from '@/lib/blogs'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import type { BlogListData, BlogsPageData } from '@/types/blog'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/blogs'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('blogs', locale as LocaleType)
}

export default async function BlogsPage({
  params,
  searchParams,
}: PageProps<'/[locale]/blogs'>) {
  const { locale } = await params
  const query = await searchParams

  // ?category=a&tag=b&sort=oldest&page=<n>: the filters and how many pages are shown (Load More)
  // live in the URL
  const categories = parseSlugs(query.category)
  const tags = parseSlugs(query.tag)
  const sort = parseSort(query.sort)
  const filterQuery = buildBlogQuery(categories, tags, sort)
  const pages = sanitizePage(query.page)

  // page content and the first page of posts are independent: fetch them in parallel
  const [page, list] = await Promise.all([
    getBlogsData.getPageData<BlogsPageData>(),
    // the first `pages` pages in one request
    getBlogsData.getList<BlogListData>({
      page: '1',
      limit: String(BLOGS_PAGE_LIMIT * pages),
      ...Object.fromEntries(filterQuery),
    }),
  ])

  // Both languages come back in one fetch — pick the JSON-LD / extra scripts for this locale
  const pageData = page.success ? page.data : undefined
  const otherMetaHtml =
    locale === 'ar'
      ? (pageData?.other_meta_ar ?? pageData?.other_meta)
      : pageData?.other_meta
  const { scripts: structuredData, inlineScripts: lineScripts } =
    sanitizeMetadata(parseMetaTags(otherMetaHtml))
  const banner = pageData?.banner_section

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      {/* the banner falls back to its translated content when the API has none */}
      <InnerBannerSection
        pageName="BlogsPage"
        data={banner?.is_visible ? banner : undefined}
      />
      <BreadcrumbBar values={[{ name: 'Blogs', link: '/blogs' }]} />
      <BlogListSection
        heading={pageData?.list_section}
        categories={pageData?.filters.categories ?? []}
        tags={pageData?.filters.tags ?? []}
        ads={pageData?.ads ?? []}
        activeCategories={categories}
        activeTags={tags}
        sort={sort}
        initialPage={pages}
        initialBlogs={list.success ? list.data.blogs : []}
        initialHasMore={list.success ? list.data.pagination.hasMore : false}
      />
    </>
  )
}
