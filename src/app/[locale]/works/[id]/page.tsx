import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import RelatedProjectsSection from '@/components/pages/work-details/related-projects.section'
import WorkDetailsSection from '@/components/pages/work-details/work-details.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Work Details | Z&S Carpets`,
  description: 'A Z&S Carpets project.',
}

export default async function WorkDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <InnerBannerSection pageName="WorksPage" />
      <BreadcrumbBar
        values={[
          { name: 'Our Work', link: '/works' },
          { name: 'Our Work Details', link: `/works/${id}`, currentPage: true },
        ]}
      />
      <WorkDetailsSection id={id} />
      <RelatedProjectsSection />
    </>
  )
}
