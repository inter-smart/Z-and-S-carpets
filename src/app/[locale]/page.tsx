import { FloorCImg1, FloorCImg2 } from '@/assets/images'
import ImgCompareSlider from '@/components/common/img-compare-slider'
import ChooseUsSection from '@/components/common/sections/choose-us-section'
import FAQSection from '@/components/common/sections/faq-section'
import ProcessSections from '@/components/common/sections/process-section'
import BannerSection from '@/components/home/banner-section'
import BestSellers from '@/components/home/best-seller-section'
import BuiltForSection from '@/components/home/built-for-section'
import CollectionSection from '@/components/home/collection-section'
import PremiumFlooringSolutionsSection from '@/components/home/premium-flooring-solutions-section'
import TestimonialsSection from '@/components/home/testimonials-section'
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
      {/* image compare slider */}
      <div className="container-wrapper mb-16 lg:mb-24">
        <ImgCompareSlider
          images={[FloorCImg2, FloorCImg1]}
          className="h-40 sm:h-100 xl:h-150"
        />
      </div>
      <ProcessSections />
      <TestimonialsSection />
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
