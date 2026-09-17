import ChooseUsSection from '@/components/common/sections/choose-us-section'
import FAQSection from '@/components/common/sections/faq-section'
import ProcessSections from '@/components/common/sections/process-section'
import { EmblaCarousel } from './embla'

export default function HomePage() {
  return (
    <>
      <h2>About us</h2>
      <FAQSection className="bg-[#EFF9FE]" />
      <ProcessSections />
      <ChooseUsSection />

      <EmblaCarousel />
    </>
  )
}
