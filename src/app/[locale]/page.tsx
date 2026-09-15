import { FloorCImg1, FloorCImg2 } from '@/assets/images'
import ChooseUsSection from '@/components/common/choose-us-section'
import FAQSection from '@/components/common/faq-section'
import ImgCompareSlider from '@/components/common/img-compare-slider'
import ProcessSections from '@/components/common/process-section'
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
      {/* <FAQSection className="bg-[#EFF9FE]" /> */}
      <section className="container-wrapper grid grid-cols-1 lg:grid-cols-2">
        <FAQSection container={false} />
        <PremiumFlooringSolutionsSection />
      </section>
    </>
  )
}
