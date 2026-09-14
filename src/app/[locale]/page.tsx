import ChooseUsSection from '@/components/common/choose-us-section'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import ProcessSections from '@/components/common/process-section'
import BestSellers from '@/components/home/best-seller-section'
import BuiltForSection from '@/components/home/built-for-section'
import CollectionSection from '@/components/home/collection-section'
import FAQSection from '@/components/home/faq-section'
import HeroSection from '@/components/home/hero-section'
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
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
