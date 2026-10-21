import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import type { LocaleType } from '@/i18n/types'
import { getMetaData } from '@/lib/api/metaApi'
import { getPrivacyPolicyData } from '@/lib/api/privacyPolicy'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type PrivacyPolicyData = {
  title: string
  content: string
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/privacy-policy'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('privacy-policy', locale as LocaleType)
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps<'/[locale]/privacy-policy'>) {
  const { locale } = await params
  const lang = locale as LocaleType

  const [result, t] = await Promise.all([
    getPrivacyPolicyData.getCmsData<PrivacyPolicyData>(lang),
    getTranslations({ locale, namespace: 'PrivacyPolicyPage' }),
  ])

  const data = result.success ? result.data : undefined
  const title = data?.title || t('title')

  return (
    <>
      <BreadcrumbBar values={[{ name: title, link: '/privacy-policy' }]} className="mt-7" />
      <article className="container-wrapper pt-5 pb-10 lg:pt-5 lg:pb-20">
        <h1 className="our-heading">{title}</h1>
        {data?.content && (
          <div
            className="blog-body blog-body-start rich-bullets mt-8 text-lg"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )}
      </article>
    </>
  )
}
