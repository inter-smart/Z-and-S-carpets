import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import BannerSection from '@/components/common/sections/banner-section'
import OurWorksSection from '@/components/pages/works/our-works'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | Z&S Carpets',
  description:
    'Discover our projects crafted with quality, innovation, and excellence.',
}

export default function WorksPage() {
  return (
    <>
      <BannerSection pageName="WorksPage" />
      <BreadcrumbBar values={[{ name: 'Our Work', link: '/works' }]} />
      <OurWorksSection />
    </>
  )
}
