import ChooseUsSection from '@/components/common/sections/choose-us-section'
import FAQSection from '@/components/common/sections/faq-section'
import ProcessSections from '@/components/common/sections/process-section'

export default function HomePage() {
  return (
    <>
      <h2 className="bg-red-200">About us</h2>
      <FAQSection className="bg-[#EFF9FE]" />
      <ProcessSections />
      <ChooseUsSection />
    </>
  )
}
