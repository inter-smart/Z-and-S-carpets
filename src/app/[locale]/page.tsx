import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import BestSellers from './best-seller.section'
import BuiltForSection from './built-for.section'
import ChooseUsSection from './choose-us.section'
import CollectionSection from './collection.section'
import FAQSection from './faq.section'
import HeroSection from './hero.section'
import ProcessSections from './process.section'
import TestimonialsSection from './testimonials.section'
import WorksSections from './works.section.tsx'

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
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
