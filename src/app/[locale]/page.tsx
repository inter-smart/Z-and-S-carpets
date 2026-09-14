import ChooseUsSection from '@/components/common/choose-us-section'
import FAQSection from '@/components/common/faq-section'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import ProcessSections from '@/components/common/process-section'
import BestSellers from '@/components/home/best-seller-section'
import BuiltForSection from '@/components/home/built-for-section'
import CollectionSection from '@/components/home/collection-section'
import HeroSection from '@/components/home/hero-section'
import PremiumFlooringSolutionsSection from '@/components/home/premium-flooring-solutions-section'
import TestimonialsSection from '@/components/home/testimonials-section'
import TrustedPartnerSection from '@/components/home/trusted-partner-section'
import WorksSections from '@/components/home/works-section'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CollectionSection />
        <BestSellers />
        <BuiltForSection />
        <WorksSections />
        <ChooseUsSection />
        <ProcessSections />
        <TestimonialsSection />
        <TrustedPartnerSection />
        {/* <FAQSection className="bg-[#EFF9FE]" /> */}
        <section className="container-wrapper grid grid-cols-1 lg:grid-cols-2">
          <FAQSection container={false} />
          <PremiumFlooringSolutionsSection />
        </section>
      </main>
      <Footer />
    </>
  )
}
