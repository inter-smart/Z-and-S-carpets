import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import CollectionSection from './collection.section'
import FAQSection from './faq.section'
import HeroSection from './hero.section'

export default function HomePage() {
  // const t = useTranslations('HomePage')
  // const locale = useLocale() as LocaleType

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CollectionSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
