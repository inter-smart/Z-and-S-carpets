import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import HeroSection from './hero.section'

export default function HomePage() {
  // const t = useTranslations('HomePage')
  // const locale = useLocale() as LocaleType

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </>
  )
}
