import {
  TrustedLogo1,
  TrustedLogo2,
  TrustedLogo3,
  TrustedLogo4,
  TrustedLogo5,
  TrustedLogo6,
  TrustedLogo7,
} from '@/assets/images'
import LookingForwardBanner from '@/components/common/looking-forward-banner'
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
    <section className="container-wrapper pb-16 lg:pb-24">
      <div>
        <h2 className="section-title">{t('title')}</h2>
      </div>
      <div className="mt-10 flex w-full flex-wrap justify-center gap-3">
        {trustedPartners.map((partner) => (
          <div
            key={partner.name}
            className="flex h-20 w-28 items-center justify-center rounded-md border border-[#0066B3]/25 bg-[#EFF9FE]/25 px-4 sm:h-32 sm:w-48 sm:px-10"
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
