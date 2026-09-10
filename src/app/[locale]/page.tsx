import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
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
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
