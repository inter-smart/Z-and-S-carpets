import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import BestSellers from './best-seller.section'
import CollectionSection from './collection.section'
import FAQSection from './faq.section'
import HeroSection from './hero.section'
import ProcessSections from './process.section'
import TestimonialsSection from './testimonials.section'
import WorksSections from './works.section.tsx'

export default function HomePage() {
  // const t = useTranslations('HomePage')
  // const locale = useLocale() as LocaleType

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CollectionSection />
        <BestSellers />
        <WorksSections />
        <ProcessSections />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
