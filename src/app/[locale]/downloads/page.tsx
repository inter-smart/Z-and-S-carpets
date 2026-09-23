import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import BannerSection from '@/components/common/sections/banner-section'
import DownloadsCardSection from '@/components/downloads/downloads-card-section'

export default function DownloadsPage() {
  return (
    <>
      <BannerSection pageName="DownloadsPage" />
      <BreadcrumbBar values={[{ name: 'Downloads', link: '/downloads' }]} />
      <DownloadsCardSection />
    </>
  )
}
