import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import FAQSection from '@/components/pages/common/faq.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ProductDetailsTabSection from '@/components/pages/product-details/product-details-tab.section'
import ProductDetailsSection from '@/components/pages/product-details/product-details.section'
import TagsSection from '@/components/pages/product-details/tags.section'
import RelatedProductsSection from '@/components/pages/products/related-products.section'
import type { LocaleType } from '@/i18n/types'
import { getDetailMetaData } from '@/lib/api/metaApi'
import { PRODUCT_NOT_FOUND, getProductsData } from '@/lib/api/products'
import { getSiteSettingsData } from '@/lib/api/siteSettings'
import {
  buildAttrsParam,
  parseAttrsParam,
  pickLocalized,
} from '@/lib/product-detail'
import type {
  ProductDetailData,
  ProductRelatedData,
} from '@/types/product-detail'
import type { SiteSettingsData } from '@/types/site-settings'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''

async function loadProduct(slug: string, attrs: string) {
  const result = await getProductsData.getDetail<ProductDetailData>(slug, attrs)
  if (result.success) return result.data
  // an unknown / inactive product is a 404; other failures (API down) surface as an error
  if (result.error === PRODUCT_NOT_FOUND) return null
  throw new Error(result.error)
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/[id]'>): Promise<Metadata> {
  // the folder keeps its old `[id]` name; the value is the product's slug
  const { locale, id: slug } = await params
  const lang = locale as LocaleType
  const data = await loadProduct(slug, '')
  if (!data) return {}
  const { product } = data

  // the SEO row written in the admin wins; the product's own title / text are the fallback
  return getDetailMetaData(
    { productId: product.id },
    lang,
    `${SITE_URL}/${locale}/products/${slug}`,
    product.media.path,
    {
      title: pickLocalized(lang, product.title, product.title_ar),
      description: pickLocalized(
        lang,
        product.short_description,
        product.short_description_ar,
      ),
    },
  )
}

export default async function ProductDetailsPage({
  params,
  searchParams,
}: PageProps<'/[locale]/products/[id]'>) {
  // the folder keeps its old `[id]` name; the value is the product's slug
  const { locale, id: slug } = await params
  const lang = locale as LocaleType
  const query = await searchParams
  const chosen = parseAttrsParam(query.attrs)
  const attrs = buildAttrsParam(chosen)

  const [data, related, settings, t] = await Promise.all([
    loadProduct(slug, attrs),
    getProductsData.getRelated<ProductRelatedData>(slug, 8),
    getSiteSettingsData.getCmsData<SiteSettingsData>(locale),
    getTranslations({ locale, namespace: 'ProductDetailsPage.Details' }),
  ])
  if (!data) notFound()

  const { product } = data
  const name = pickLocalized(lang, product.title, product.title_ar)
  const productUrl = `${SITE_URL}/${locale}/products/${slug}`
  const category = product.categories.at(-1)
  const selected = data.variants.find(
    (variant) => variant.id === data.selected_variant_id,
  )

  // The description under the product name always belongs to the product (its own text, else the
  // short text) and never changes with the selected variant. The "Product Description" detail
  // field is shown as a tab like every other detail field.
  const descriptionHtml =
    pickLocalized(lang, product.description, product.description_ar) ||
    pickLocalized(
      lang,
      product.short_description &&
        `<p>${escapeHtml(product.short_description)}</p>`,
      product.short_description_ar &&
        `<p>${escapeHtml(product.short_description_ar)}</p>`,
    )

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: pickLocalized(
      lang,
      product.short_description,
      product.short_description_ar,
    ),
    image: selected?.media.path || product.media.path || undefined,
    sku: selected?.sku || undefined,
    category: category
      ? pickLocalized(lang, category.title, category.title_ar)
      : undefined,
    url: productUrl,
  }

  return (
    <>
      <DynamicMeta structuredData={[productSchema]} />
      <InnerBannerSection pageName="ProductDetailsPage" />
      <BreadcrumbBar
        values={[
          { name: t('products'), link: '/products' },
          ...(category
            ? [
                {
                  name: pickLocalized(lang, category.title, category.title_ar),
                  link: `/products?category=${category.slug}`,
                },
              ]
            : []),
          { name, link: `/products/${slug}`, currentPage: true },
        ]}
        className="mt-2"
      />
      <ProductDetailsSection
        data={data}
        whatsapp={settings.success ? settings.data.footer.whatsapp_number : ''}
        productUrl={productUrl}
        descriptionHtml={descriptionHtml}
        chosen={chosen}
      />
      <ProductDetailsTabSection fields={data.details} />
      {related.success && related.data.products.length > 0 && (
        <RelatedProductsSection
          className="bg-[#EFF9FE]"
          products={related.data.products}
        />
      )}
      {data.faqs_section.list.length > 0 && (
        <FAQSection data={data.faqs_section} />
      )}
      <TagsSection tags={product.tags} locale={lang} />
    </>
  )
}
