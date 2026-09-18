import BannerSection from '@/components/common/sections/banner-section'
import ChooseUsSection from '@/components/common/sections/choose-us-section'
import FAQSection from '@/components/common/sections/faq-section'
import ProcessSections from '@/components/common/sections/process-section'

export default function HomePage() {
  return (
    <>
      <BannerSection pageName="AboutPage" />
      <FAQSection className="bg-[#EFF9FE]" />
      <ProcessSections />
      <ChooseUsSection />
    </>
  )
}
