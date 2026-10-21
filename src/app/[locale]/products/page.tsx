import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ProductListSection from '@/components/pages/products/product-list.section'
import type { LocaleType } from '@/i18n/types'
import { getMetaData } from '@/lib/api/metaApi'
import { getProductsData } from '@/lib/api/products'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import {
  PRODUCTS_PAGE_LIMIT,
  buildFilterQuery,
  parseAttrs,
  parseCategories,
  sanitizePage,
} from '@/lib/products'
import type {
  ProductFiltersData,
  ProductListData,
  ProductsPageData,
} from '@/types/product-list'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('products', locale as LocaleType)
}

export default async function ProductsPage({
  params,
  searchParams,
}: PageProps<'/[locale]/products'>) {
  const { locale } = await params
  const query = await searchParams

  // ?category=a,b&attrs=color:oak,size:2m&page=<n>: the selected filters and how many pages are
  // shown (Load More) live in the URL
  const categories = parseCategories(query.category)
  const attrs = parseAttrs(query.attrs)
  const filterQuery = buildFilterQuery(categories, attrs)
  const pages = sanitizePage(query.page)

  // page content, filter options and the first page of products are independent: fetch them in
  // parallel
  const [page, filters, list, t] = await Promise.all([
    getProductsData.getPageData<ProductsPageData>(),
    // sub-categories are only loaded for the open categories, attribute values follow the results
    getProductsData.getFilters<ProductFiltersData>(
      Object.fromEntries(filterQuery),
    ),
    // the first `pages` pages in one request
    getProductsData.getList<ProductListData>({
      page: '1',
      limit: String(PRODUCTS_PAGE_LIMIT * pages),
      ...Object.fromEntries(filterQuery),
    }),
    getTranslations({ locale, namespace: 'ProductsPage' }),
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
        pageName="ProductsPage"
        data={banner?.is_visible ? banner : undefined}
      />
      <BreadcrumbBar
        values={[
          {
            name: t('BannerSection.title'),
            link: '/products',
          },
        ]}
        className="z-0"
      />
      <ProductListSection
        filters={filters.success ? filters.data : null}
        activeCategories={categories}
        activeAttrs={attrs}
        initialPage={pages}
        initialProducts={list.success ? list.data.products : []}
        initialHasMore={list.success ? list.data.pagination.hasMore : false}
        faqs={pageData?.faqs_section}
      />
    </>
  )
}
