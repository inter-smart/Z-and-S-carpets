import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import BlogListSection from '@/components/pages/blogs/blog-list.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs | Z&S Carpets',
  description: 'Latest flooring updates and insights from Z&S Carpets.',
}

export default function BlogsPage() {
  return (
    <>
      <InnerBannerSection pageName="BlogsPage" />
      <BreadcrumbBar values={[{ name: 'Blogs', link: '/blogs' }]} />
      <BlogListSection />
    </>
  )
}
