import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import IntroSection from '@/components/pages/services/intro.section'
import ProcessSection from '@/components/pages/services/process.section'
import ServicesGridSection from '@/components/pages/services/services-grid.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Z&S Carpets',
  description:
    'Explore expert flooring services and the Z&S Carpets project process.',
}

export default function ServicesPage() {
  return (
    <>
      <InnerBannerSection pageName="ServicesPage" />
      <BreadcrumbBar
        values={[{ name: 'Services', link: '/services' }]}
        className="bg-[#EFF9FE]"
      />
      <IntroSection />
      <ServicesGridSection />
      <ProcessSection />
    </>
  )
}
