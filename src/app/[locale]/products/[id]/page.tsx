import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import FAQSection from '@/components/pages/common/faq.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ProductDetailsTabSection from '@/components/pages/product-details/product-details-tab.section'
import ProductDetailsSection from '@/components/pages/product-details/product-details.section'
import TagsSection from '@/components/pages/product-details/tags.section'
import RelatedProductsSection from '@/components/pages/products/related-products.section'
import type { ProductDetailsType } from '@/types/product'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Details | Z&S Carpets',
  description: 'Explore product details.',
}

const dummyProductDetails: ProductDetailsType = {
  name: 'Wood Pattern Vinyl',
  category: 'Vinyl Flooring',
  description:
    'Self adhesive Wood Pattern Vinyl - 1.5mm is a quick and simple solution to redecorate a space with professional-looking results. Wood effect vinyl floor planks mimic the appearance of real hardwood at a fraction of the price. It is well-liked throughout the world, including in the United States, East Asia, and other regions.',
  image: '/images/floor-img-52.webp',
  tags: [
    'Wooden Pattern',
    'PVC sheet mat',
    'Vinyl',
    'Synthetic floor',
    'Waterproof',
    'Anti-slip',
    //
    'Wooden Pattern',
    'PVC sheet mat',
    'Vinyl',
    'Synthetic floor',
    'Waterproof',
    'Anti-slip',
  ],
  specifications: [
    'Waterproof',
    'Easy to Maintain',
    'Easy installation',
    'Extreme Durability',
    'Moisture Resistant',
    'Anti-Slip',
  ],
  sizes: ['S - 90 cm', 'M - 120cm', 'L - 150 cm', 'XL - 180 cm'],
  colors: [
    {
      label: '267-7',
      image: '/images/prod-color-1.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-2.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-3.png',
    },
    {
      label: '551223',
      image: '/images/prod-color-4.png',
    },
    {
      label: '555202',
      image: '/images/prod-color-5.png',
    },
    {
      label: '555204',
      image: '/images/prod-color-6.png',
    },
    //
    {
      label: '267-7',
      image: '/images/prod-color-1.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-2.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-3.png',
    },
    {
      label: '551223',
      image: '/images/prod-color-4.png',
    },
    {
      label: '555202',
      image: '/images/prod-color-5.png',
    },
    {
      label: '555204',
      image: '/images/prod-color-6.png',
    },
  ],
  detailedDesc: {
    desc: 'Our Wood Pattern Vinyl flooring offers a perfect blend of aesthetic appeal and functional performance. Designed for high-traffic residential and light commercial environments, it features a 0.5mm wear layer that protects against scratches and scuffs.',
    bullets: [
      'Eco-friendly virgin vinyl material.',
      'Heat-resistant and moisture-proof backing.',
      'Low VOC emissions for better indoor air quality.',
      'Realistic wood embossing textures.',
    ],
  },
  detailPhotos: [
    {
      title: 'Experience realistic',
      description: 'Wood aesthetics with durable vinyl',
      image: '/images/prod-details-img-1.webp',
    },
    {
      title: 'Experience realistic',
      description: 'Wood aesthetics with durable vinyl',
      image: '/images/prod-details-img-2.webp',
    },
    {
      title: 'Experience realistic',
      description: 'Wood aesthetics with durable vinyl',
      image: '/images/prod-details-img-3.webp',
    },
    {
      title: 'Experience realistic',
      description: 'Wood aesthetics with durable vinyl performance.',
      image: '/images/prod-details-img-4.webp',
    },
    {
      title: 'Crafted to deliver',
      description: 'Timeless wood elegance with modern durability.',
      image: '/images/prod-details-img-5.webp',
    },
  ],
  videos: [
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
  ],
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
      <ProductDetailsSection product={dummyProductDetails} />
      <ProductDetailsTabSection product={dummyProductDetails} />
      <RelatedProductsSection className="bg-[#EFF9FE]" />
      <FAQSection />
      <TagsSection />
    </>
  )
}
