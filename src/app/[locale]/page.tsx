import ChooseUsSection from '@/components/pages/common/choose-us.section'
import FAQSection from '@/components/pages/common/faq.section'
import ProcessSections from '@/components/pages/common/process.section'
import BannerSection from '@/components/pages/home/banner.section'
import BestSellersSection from '@/components/pages/home/best-sellers.section'
import BuiltForSection from '@/components/pages/home/built-for.section'
import CollectionSection from '@/components/pages/home/collection.section'
import CustomerExpSection from '@/components/pages/home/customer-exp.section'
import ImgCompareSection from '@/components/pages/home/img-compare.section'
import PremiumSolutionsSection from '@/components/pages/home/premium-solutions.section'
import TrustedPartnerSection from '@/components/pages/home/trusted-partner.section'
import WorksSection from '@/components/pages/home/works.section'

export default function HomePage() {
  return (
    <>
      <BannerSection />
      <CollectionSection />
      <BestSellersSection />
      <BuiltForSection />
      <WorksSection />
      <ChooseUsSection />
      <ImgCompareSection />
      <ProcessSections />
      <CustomerExpSection />
      <TrustedPartnerSection />
      <section className="relative">
        {/* right-side background */}
        <div className="pointer-events-none absolute inset-y-0 hidden bg-[#EFF9FE] lg:block ltr:right-0 ltr:left-1/2 rtl:right-1/2 rtl:left-0" />
        {/* actual content */}
        <div className="lg:container-wrapper relative grid grid-cols-1 lg:grid-cols-2">
          <FAQSection
            container={false}
            className="container-wrapper lg:container-wrapper-none"
          />
          <PremiumSolutionsSection />
        </div>
      </section>
    </>
  )
}
