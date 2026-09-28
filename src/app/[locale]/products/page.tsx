import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import FAQSection from '@/components/pages/common/faq.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ProductListSection from '@/components/pages/products/product-list.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Z&S Carpets',
  description:
    'Explore flooring products for residential and commercial spaces.',
}

export default function ProductsPage() {
  return (
    <>
      <InnerBannerSection pageName="ProductsPage" />
      <BreadcrumbBar
        values={[
          {
            name: 'Products',
            link: '/products',
          },
        ]}
        className="md:bg-[#EFF9FE]"
      />
      <ProductListSection />
      <FAQSection className="bg-[#EFF9FE]" />
    </>
  )
}
