import ChooseUsSection from '@/components/common/sections/choose-us-section'
import FAQSection from '@/components/common/sections/faq-section'
import ProcessSections from '@/components/common/sections/process-section'
import BannerSection from '@/components/home/banner-section'
import BestSellers from '@/components/home/best-seller-section'
import BuiltForSection from '@/components/home/built-for-section'
import CollectionSection from '@/components/home/collection-section'
import { CustomerExpSection } from '@/components/home/customer-exp-section'
import ImgCompareSection from '@/components/home/img-compare-section'
import PremiumFlooringSolutionsSection from '@/components/home/premium-flooring-solutions-section'
import TrustedPartnerSection from '@/components/home/trusted-partner-section'
import WorksSections from '@/components/home/works-section'

export default function HomePage() {
  return (
    <>
      <BannerSection />
      <CollectionSection />
      <BestSellers />
      <BuiltForSection />
      <WorksSections />
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
          <PremiumFlooringSolutionsSection />
        </div>
      </section>
    </>
  )
}
