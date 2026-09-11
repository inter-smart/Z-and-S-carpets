import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import CollectionSection from './collection.section'
import FAQSection from './faq.section'
import HeroSection from './hero.section'
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
        <WorksSections />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
