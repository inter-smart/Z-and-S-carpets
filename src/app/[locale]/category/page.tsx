import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import CategoryListSection from '@/components/pages/category/category-list.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import type { LocaleType } from '@/i18n/types'
import { getCategoriesData } from '@/lib/api/categories'
import { getMetaData } from '@/lib/api/metaApi'
import {
  CATEGORIES_PAGE_LIMIT,
  sanitizeBadge,
  sanitizePage,
} from '@/lib/categories'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import type { CategoriesPageData, CategoryListData } from '@/types/category'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/category'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('category', locale as LocaleType)
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<'/[locale]/category'>) {
  const { locale } = await params
  const query = await searchParams

  // ?badge=<slug>&page=<n>: the filter and how many pages are shown (Load More) live in the URL
  const badge = sanitizeBadge(query.badge)
  const pages = sanitizePage(query.page)

  // page content and the first page of categories are independent: fetch them in parallel
  const [page, list, t] = await Promise.all([
    getCategoriesData.getPageData<CategoriesPageData>(),
    // the first `pages` pages in one request
    getCategoriesData.getList<CategoryListData>({
      page: '1',
      limit: String(CATEGORIES_PAGE_LIMIT * pages),
      ...(badge && { badge }),
    }),
    getTranslations({ locale, namespace: 'CategoryPage' }),
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
        pageName="CategoryPage"
        data={banner?.is_visible ? banner : undefined}
      />
      <BreadcrumbBar
        values={[{ name: t('BannerSection.title'), link: '/category' }]}
      />
      {/* keyed by the filter so the loaded pages reset when it changes */}
      <CategoryListSection
        key={badge || 'all'}
        activeBadge={badge}
        initialPage={pages}
        heading={pageData?.list_section}
        filters={pageData?.filters ?? []}
        initialCategories={list.success ? list.data.categories : []}
        initialHasMore={list.success ? list.data.pagination.hasMore : false}
      />
    </>
  )
}
