import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import HistorySection from '@/components/pages/about/history.section'
import IndustriesSection from '@/components/pages/about/industries.section'
import ManagementSection from '@/components/pages/about/management.section'
import ValuesSection from '@/components/pages/about/values.section'
import ChooseUsSection from '@/components/pages/common/choose-us.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ProcessSections from '@/components/pages/common/process.section'
import IntroSection from '@/components/pages/services/intro.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Z&S Carpets',
  description: 'About Z&S Carpets.',
}

export default function AboutUsPage() {
  return (
    <>
      <InnerBannerSection pageName="AboutPage" />
      <BreadcrumbBar values={[{ name: 'About Us', link: '/about' }]} />
      <IntroSection />
      {/* <FAQSection className="bg-[#EFF9FE]" /> */}
      <HistorySection />
      <ManagementSection />
      <ProcessSections />
      <ValuesSection />
      <ChooseUsSection />
      <IndustriesSection />
    </>
  )
}
