import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import DownloadsCardSection from '@/components/pages/downloads/downloads-card.section'

export default function DownloadsPage() {
  return (
    <>
      <InnerBannerSection pageName="DownloadsPage" />
      <BreadcrumbBar values={[{ name: 'Downloads', link: '/downloads' }]} />
      <DownloadsCardSection />
    </>
  )
}
