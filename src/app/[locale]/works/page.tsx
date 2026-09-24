import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import OurWorksSection from '@/components/pages/works/our-works.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | Z&S Carpets',
  description:
    'Discover our projects crafted with quality, innovation, and excellence.',
}

export default function WorksPage() {
  return (
    <>
      <InnerBannerSection pageName="WorksPage" />
      <BreadcrumbBar values={[{ name: 'Our Work', link: '/works' }]} />
      <OurWorksSection />
    </>
  )
}
