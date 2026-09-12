import {
  TrustedLogo1,
  TrustedLogo2,
  TrustedLogo3,
  TrustedLogo4,
  TrustedLogo5,
  TrustedLogo6,
  TrustedLogo7,
} from '@/assets/images'
import LookingForwardBanner from '@/components/looking-forward-banner'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const trustedPartnerImgs = {
  'trusted-1': TrustedLogo1,
  'trusted-2': TrustedLogo2,
  'trusted-3': TrustedLogo3,
  'trusted-4': TrustedLogo4,
  'trusted-5': TrustedLogo5,
  'trusted-6': TrustedLogo6,
  'trusted-7': TrustedLogo7,
}

export default function TrustedPartnerSection() {
  const t = useTranslations('TrustedPartner')
  const trustedPartners = t.raw('partners') as {
    name: string
    image: string
  }[]

  return (
    <section className="container-wrapper py-16 lg:py-24">
      <div>
        <h2 className="text-balance text-4xl font-medium ltr:font-nobile rtl:font-cairo tracking-tight md:text-5xl">
          {t('title')}
        </h2>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-3 mt-10">
        {trustedPartners.map((partner) => (
          <div
            key={partner.name}
            className="w-28 h-20 sm:w-48 sm:h-32 px-4 sm:px-10 rounded-md bg-[#EFF9FE]/25 border border-[#0066B3]/25 flex justify-center items-center"
          >
            <Image
              src={
                trustedPartnerImgs[
                  partner.image as keyof typeof trustedPartnerImgs
                ]
              }
              alt="site-logo"
              className="h-auto w-full cursor-pointer"
            />
          </div>
        ))}
      </div>
      <LookingForwardBanner />
    </section>
  )
}
