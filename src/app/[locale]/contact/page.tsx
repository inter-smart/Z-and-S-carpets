import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import BannerSection from '@/components/common/sections/banner-section'
import ContactDetailsSection from '@/components/contact/contact-details-section'
import GetInTouchForm from '@/components/contact/get-in-touch-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Z&S Carpets',
  description: 'Contact Z&S Carpets team.',
}

export default function ContactUsPage() {
  return (
    <>
      <BannerSection pageName="ContactPage" />
      <BreadcrumbBar values={[{ name: 'Contact Us', link: '/contact' }]} />

      <div className="container-wrapper grid pt-5 pb-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12 lg:pt-12 lg:pb-20 xl:gap-24">
        <ContactDetailsSection />
        <GetInTouchForm />
      </div>

      {/* map section*/}
      <div className="h-80 w-full overflow-hidden sm:h-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.3980334382486!2d55.46436157550704!3d25.156034577737497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f63c067f2c0d1%3A0x6dd8d7a70ad59b3f!2sZia%20And%20Sagor%20Carpets%20Trading%20LLC!5e0!3m2!1sen!2sin!4v1789990487877!5m2!1sen!2sin"
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </>
  )
}
