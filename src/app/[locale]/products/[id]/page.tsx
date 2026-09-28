import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import FAQSection from '@/components/pages/common/faq.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ProductDetailsSection from '@/components/pages/product-details/product-details.section'
import TagsSection from '@/components/pages/product-details/tags.section'
import RelatedProductsSection from '@/components/pages/products/related-products.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Details | Z&S Carpets',
  description: 'Explore product details.',
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <InnerBannerSection pageName="ProductDetailsPage" />
      <BreadcrumbBar
        values={[
          {
            name: 'Products',
            link: '/products',
          },
          {
            name: 'Product Details',
            link: `/products/${id}`,
            currentPage: true,
          },
        ]}
      />
      <ProductDetailsSection />
      <RelatedProductsSection className="bg-[#EFF9FE]" />
      <FAQSection />
      <TagsSection />
    </>
  )
}
