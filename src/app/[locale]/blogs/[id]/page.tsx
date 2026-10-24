import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import { BlogDetailsSection } from '@/components/pages/blog-details/blog-details.section'
import RelatedBlogsSection from '@/components/pages/blog-details/related-blogs.section'
import AdBanner from '@/components/pages/common/ad.banner'
import type { LocaleType } from '@/i18n/types'
import { BLOG_NOT_FOUND, getBlogsData } from '@/lib/api/blogs'
import { getDetailMetaData } from '@/lib/api/metaApi'
import {
  localizeInternalLinks,
  pickLocalized,
  splitAtGallery,
} from '@/lib/blogs'
import type {
  BlogDetailData,
  BlogRelatedData,
  BlogsPageData,
} from '@/types/blog'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''

async function loadPost(slug: string) {
  const result = await getBlogsData.getDetail<BlogDetailData>(slug)
  if (result.success) return result.data
  // an unknown / unpublished post is a 404; other failures (API down) surface as an error
  if (result.error === BLOG_NOT_FOUND) return null
  throw new Error(result.error)
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/blogs/[id]'>): Promise<Metadata> {
  // the folder keeps its old `[id]` name; the value is the post's slug
  const { locale, id: slug } = await params
  const post = await loadPost(slug)
  if (!post) return {}

  // the SEO row written in the admin wins; the post's own title / excerpt are the fallback
  return getDetailMetaData(
    { blogId: slug },
    locale as LocaleType,
    `${SITE_URL}/${locale}/blogs/${slug}`,
    post.media.path,
    {
      title: pickLocalized(locale as LocaleType, post.title, post.title_ar),
      description: pickLocalized(
        locale as LocaleType,
        post.excerpt,
        post.excerpt_ar,
      ),
    },
  )
}

export default async function BlogDetailsPage({
  params,
}: PageProps<'/[locale]/blogs/[id]'>) {
  // the folder keeps its old `[id]` name; the value is the post's slug
  const { locale, id: slug } = await params
  const lang = locale as LocaleType

  const [post, page, related, t] = await Promise.all([
    loadPost(slug),
    getBlogsData.getPageData<BlogsPageData>(),
    getBlogsData.getRelated<BlogRelatedData>(slug, 6),
    getTranslations({ locale, namespace: 'BlogsPage' }),
  ])
  if (!post) notFound()

  const pageData = page.success ? page.data : undefined
  const title = pickLocalized(lang, post.title, post.title_ar)

  // the related section renders only with a CMS heading (no translation fallback)
  const relatedTitle = pageData?.list_section.related_title
  const relatedTitleAr = pageData?.list_section.related_title_ar
  const relatedHeading =
    relatedTitle && relatedTitleAr
      ? { title: relatedTitle, title_ar: relatedTitleAr }
      : undefined

  // the Arabic page shows the English body until an Arabic one is written
  const content = localizeInternalLinks(
    pickLocalized(lang, post.content, post.content_ar),
    lang,
  )
  // the swiper sits where the editor's `[gallery]` marker is (after the body when there is none)
  const [before, after, hasMarker] = splitAtGallery(content)
  const contentBefore = before
  const contentAfter = hasMarker ? after : ''

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: pickLocalized(lang, post.excerpt, post.excerpt_ar),
    image: post.media.path ? [post.media.path] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    inLanguage: lang,
    author: post.author
      ? {
          '@type': 'Person',
          name: pickLocalized(lang, post.author, post.author_ar),
        }
      : undefined,
    mainEntityOfPage: `${SITE_URL}/${lang}/blogs/${slug}`,
  }

  return (
    <>
      <DynamicMeta structuredData={[articleSchema]} />
      <BreadcrumbBar
        values={[
          { name: t('Breadcrumb.title'), link: `/blogs` },
          { name: title, link: `/blogs/${slug}`, currentPage: true },
        ]}
        className="mt-2"
      />
      <BlogDetailsSection
        article={post}
        contentBefore={contentBefore}
        contentAfter={contentAfter}
      />
      {pageData?.ads[0] && (
        <div className="container-wrapper my-15">
          <AdBanner ad={pageData.ads[0]} />
        </div>
      )}
      {related.success && related.data.blogs.length > 0 && relatedHeading && (
        <RelatedBlogsSection
          blogs={related.data.blogs}
          heading={relatedHeading}
        />
      )}
    </>
  )
}
