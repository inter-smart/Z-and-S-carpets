import IndustriesSection from '@/components/about/industries-section'
import IntroSection from '@/components/about/intro-section'
import ManagementSection from '@/components/about/management-section'
import ValuesSection from '@/components/about/values-section'
import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import BannerSection from '@/components/common/sections/banner-section'
import ChooseUsSection from '@/components/common/sections/choose-us-section'
import ProcessSections from '@/components/common/sections/process-section'

export default function HomePage() {
  return (
    <>
      <BannerSection pageName="AboutPage" />
      <BreadcrumbBar
        values={[
          { name: 'About Us', link: 'about' },
          { name: 'Contact Us', link: 'contact' },
        ]}
      />
      <IntroSection />
      {/* <FAQSection className="bg-[#EFF9FE]" /> */}
      <ManagementSection />
      <ProcessSections />
      <ValuesSection />
      <ChooseUsSection />
      <IndustriesSection />
    </>
  )
}
