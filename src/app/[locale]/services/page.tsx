import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import BannerSection from '@/components/common/sections/banner-section'
import IntroSection from '@/components/services/intro-section'
import ProcessSection from '@/components/services/process-section'
import ServicesGridSection from '@/components/services/services-grid-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Z&S Carpets',
  description:
    'Explore expert flooring services and the Z&S Carpets project process.',
}

export default function ServicesPage() {
  return (
    <>
      <BannerSection pageName="ServicesPage" />
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
