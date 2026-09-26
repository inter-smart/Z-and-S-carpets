import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import { BlogDetailsSection } from '@/components/pages/blog-details/blog-details.section'
import RelatedBlogsSection from '@/components/pages/blog-details/related-blogs.section'
import { AdBanner1 } from '@/components/pages/common/ad.banner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs | Z&S Carpets',
  description: 'Latest flooring updates and insights from Z&S Carpets.',
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <BreadcrumbBar
        values={[
          { name: 'Blogs', link: `/blogs` },
          { name: 'Blog Details', link: `/blogs/${id}`, currentPage: true },
        ]}
      />
      <BlogDetailsSection />
      <div className="container-wrapper my-15">
        <AdBanner1 />
      </div>
      <RelatedBlogsSection />
    </>
  )
}
