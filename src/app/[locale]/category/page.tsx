import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import CategoryListSection from '@/components/pages/category/category-list.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'

export default function CategoryPage() {
  return (
    <>
      <InnerBannerSection pageName="CategoryPage" />
      <BreadcrumbBar values={[{ name: 'Category', link: '/category' }]} />
      <CategoryListSection />
    </>
  )
}
