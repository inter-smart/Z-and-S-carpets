'use client'

import { Button } from '@/components/ui/button'
import type { blogItemType } from '@/types/blog'
import { cn } from 'cn'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import BlogImgCarousal from './blog-img.carousal'

function splitByCharLength(tags: string[]): string[][] {
  const totalLen = tags.reduce((sum, t) => sum + t.length, 0)
  const target = totalLen / 2

  let currentLen = 0
  let splitIdx = tags.length

  for (let i = 0; i < tags.length; i++) {
    currentLen += tags[i].length
    if (currentLen >= target) {
      splitIdx = i + 1
      break
    }
  }

  return [tags.slice(0, splitIdx), tags.slice(splitIdx)]
}

export function BlogDetailsSection({ id }: { id: string }) {
  const t2 = useTranslations('Blogs')

  const data = t2.raw('Items') as blogItemType[]

  const article = data.find((item) => item.id === id)

  // #TAG ROW SCROLL
  const tagRowRef = useRef<HTMLDivElement>(null)
  const [isTagRowScrollable, setIsTagRowScrollable] = useState(false)

  const scrollTagRow = (direction: 'left' | 'right') => {
    tagRowRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const container = tagRowRef.current
    if (!container) return

    const canScrollX = container.scrollWidth > container.clientWidth
    const canScrollY = container.scrollHeight > container.clientHeight

    setIsTagRowScrollable(canScrollX || canScrollY)
  }, [])

  if (!article) return null

  const articleTags = splitByCharLength(article.tags)

  return (
    <section className="container-wrapper pt-10">
      <article className="rounded-md border border-[#BABABA] px-5 py-7 lg:px-8 lg:py-10">
        <Image
          src={article.image[0]}
          alt="Laminate flooring interior"
          width={880}
          height={580}
          className="mb-5 h-70 w-full rounded-sm object-cover md:float-right md:ms-10 md:h-60 md:w-3/7 xl:ms-20 xl:mb-10 xl:h-80 rtl:md:float-left"
        />
        <p className="text-our-purple text-sm">
          • {article.date} | {article.author}
        </p>

        <div className="xl:w-110 2xl:w-130">
          <h1 className="mt-3 text-5xl leading-7 font-semibold">
            {article.title}
          </h1>
        </div>

        <div className="relative md:w-75 lg:w-95 xl:w-110 2xl:w-130">
          <div
            ref={tagRowRef}
            className="mt-4 flex scrollbar-none flex-col gap-1 overflow-x-auto scroll-smooth ltr:pb-1 rtl:gap-2 rtl:py-1"
          >
            <p className="space-x-1">
              {articleTags[0].map((tag, i) => (
                <span
                  key={i}
                  className="rounded border border-[#CCCCCC] px-2 py-1 text-sm whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </p>
            <p className="space-x-1">
              {articleTags[1].map((tag, i) => (
                <span
                  key={i}
                  className="rounded border border-[#CCCCCC] px-2 py-1 text-sm whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
          {/* LEFT ARROW */}
          <div className="absolute top-0 -left-4 h-full lg:-left-5">
            <Button
              aria-label="Scroll up"
              variant="ghost"
              // disabled={!isTagRowScrollable}
              onClick={() => scrollTagRow('left')}
              className={cn(
                'text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!',
                !isTagRowScrollable && 'hidden',
              )}
            >
              <ChevronLeftIcon className="size-2.5" />
            </Button>
          </div>
          {/* RIGHT ARROW */}
          <div className="absolute top-0 -right-4 h-full lg:-right-5">
            <Button
              aria-label="Scroll up"
              variant="ghost"
              // disabled={!isTagRowScrollable}
              onClick={() => scrollTagRow('right')}
              className={cn(
                'text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!',
                !isTagRowScrollable && 'hidden',
              )}
            >
              <ChevronRightIcon className="size-2.5" />
            </Button>
          </div>
        </div>

        <Section
          paragraphs={[
            "A floor isn't merely a surface to be trodden upon; it's the silent canvas that anchors the entire narrative of a curated home. You likely believe that true luxury must be enduring, yet the abrasive reality of the UAE's fine desert sand, often composed of silica particles as small as 0.1mm, threatens to dull the luster of even the most exquisite interiors. It's a common anxiety for the modern connoisseur that a single moment of friction might mar a masterpiece. This is why understanding laminate flooring scratch resistance becomes an essential pursuit for those who refuse to compromise on aesthetic integrity.",
            "Discover how the intricate engineering of high-end laminate preserves the soul of your home against the rigours of daily life. We'll explore the technical provenance of AC5 ratings, which are rigorously tested to withstand over 6,000 revolutions of abrasive contact. You'll gain the confidence to select a foundation that withstands the unique environmental demands of the Emirates, supported by a maintenance protocol that treats your flooring as the cultural artifact it truly is.",
          ]}
        />
        <Section
          title="Key Takeaways"
          list={[
            'Unveil the scientific alchemy of the wear layer, where aluminum oxide crystals are heat-fused to create a diamond-hard shield that preserves the soul of your home.',
            "Master the nuances of the Abrasion Criteria (AC) rating and the rigorous Taber Test to select a foundation that mirrors your lifestyle's unique demands.",
            "Discover specialized preservation techniques tailored for the UAE, ensuring the fine sands of our regional landscape do not compromise your floor's exquisite finish.",
            'Learn how laminate flooring scratch resistance acts as a silent guardian, allowing high-end materials to maintain their timeless elegance far longer than traditional solid timber.',
            'Align your aesthetic vision with technical mastery by understanding why a curated selection is essential for creating a home that resonates with both beauty and resilience.',
          ]}
        />
        <Section
          title="The Essence of Durability: Defining Laminate Flooring Scratch Resistance"
          paragraphs={[
            "To the discerning eye, the floor serves as the foundational soul of a residence; it is a silent stage where the theater of daily life unfolds with grace. Achieving true laminate flooring scratch resistance isn't merely a technical specification. It's an act of preserving the aesthetic integrity of a curated space against the inevitable friction of existence. This resilience is defined by the ability of the uppermost surface to withstand both the sharp impact of dropped objects and the persistent, abrasive movement of furniture or footsteps that would otherwise mar a lesser material.",
            <>
              The architecture of this protection begins with the wear layer, a
              sophisticated shield that acts as the primary architect of surface
              integrity. High-end&nbsp;
              <Link
                href="/products?category=laminate-flooring"
                className="text-our-blue underline"
              >
                Laminate flooring
              </Link>
              &nbsp;utilizes a complex fusion of melamine resin and aluminum
              oxide to create a barrier that is significantly harder than the
              organic fibers found in untreated timber. By investing in such
              advanced engineering, a homeowner secures the long-term visual
              harmony of their interior, ensuring the floor remains a
              masterpiece rather than a mounting collection of imperfections.
            </>,
          ]}
        />
        <Section
          title="The Aesthetic Cost of Surface Wear"
          paragraphs={[
            "In the sunlight of a Dubai afternoon, even the smallest imperfections become visible to the naked eye. Micro-scratches act as tiny canyons on the floor's surface, catching the light and gradually dulling the rich lustre of exquisite wood-grain patterns. Over time, these minute abrasions accumulate, stripping away the depth of color that initially drew the connoisseur to the design. There is a profound psychological comfort in knowing a floor can handle the unpredictable moments of a vibrant household without sacrificing its elegance. Scratch resistance is the silent sentinel of floor artistry.",
          ]}
        />
        <Section
          title="Laminate vs. Natural Wood: A Study in Resilience"
          paragraphs={[
            <>
              While traditional&nbsp;
              <a
                href="https://www.zandscarpets.com/our-products/wood-flooring-ultimate-buying-guide-for-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-our-blue underline"
              >
                wooden flooring
              </a>
              &nbsp;offers a timeless warmth that many collectors in the UAE
              admire, it often demands a level of vigilance and frequent
              refinishing that doesn&apos;t always align with the requirements
              of contemporary luxury living. Natural oils and lacquers, though
              beautiful, possess a lower score on the Mohs scale of mineral
              hardness compared to the melamine-infused surfaces of premium
              laminate.
            </>,
            'The difference lies in the deliberate, pressed-layer construction of the material. This process involves:',
          ]}
          list={[
            'High-pressure bonding of decorative layers to a high-density fiberboard (HDF) core.',
            'The application of a crystalline top coat that prevents the deep gouging common in softer, natural materials.',
            'A structural density that resists the indentations often caused by heavy, artisanal furniture pieces.',
          ]}
        />
        <Section
          paragraphs={[
            "By choosing a surface engineered for laminate flooring scratch resistance, the homeowner bridges the gap between ancient aesthetic traditions and the durability required for a lasting legacy. It's a choice that favors the preservation of beauty, allowing the focus to remain on the curation of the home rather than the maintenance of its foundation.",
          ]}
          hasMarginTop={false}
        />
        <BlogImgCarousal article={article} />
        <Section
          title="Aluminium Oxide: The Invisible Armor"
          paragraphs={[
            <>
              The presence of aluminium oxide provides a tactile experience that
              distinguishes artisanal collections from common alternatives. In a
              high-quality plank, the wear layer is applied with such precision
              that it mirrors the authentic grain of natural wood, offering a
              sophisticated texture rather than a sterile, plastic sensation.
              While this coating provides exceptional laminate flooring scratch
              resistance, it&apos;s vital to remember that no surface is
              entirely scratch-proof. Under extreme conditions, such as dragging
              heavy mahogany furniture across the floor, even the most resilient
              shield may yield. Discerning homeowners often look for the&nbsp;
              <a
                href="https://nalfa.com/product-certification-standards/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-our-blue underline"
              >
                NALFA Certification Seal
              </a>
              &nbsp;to verify that their chosen material has undergone the 14
              rigorous tests required to meet international standards of
              excellence.
            </>,
          ]}
        />
        <Section
          title="The Fusion Process: Crafting Impermeability"
          paragraphs={[
            <>
              The creation of this protective shield involves high-pressure
              lamination, a technique where the wear, decorative, and core
              layers are fused under intense heat and pressure exceeding 1,350
              pounds per square inch. This artisanal fusion results in a
              non-porous surface that prevents moisture and microscopic grit
              from compromising the floor&apos;s integrity. For those who
              prioritize an even more rigid foundation, many designers now
              compare these high-end laminates to&nbsp;
              <a
                href="https://www.zandscarpets.com/our-products/spc-flooring"
                target="_blank"
                rel="noopener noreferrer"
                className="text-our-blue underline"
              >
                SPC flooring
              </a>
              &nbsp;for its legendary core stability. The thickness of this wear
              layer, often measured in microns, dictates the lifespan of the
              installation, with premium 20-mil layers often carrying
              residential warranties that span 25 years. To ensure the curated
              colors of your floor remain vibrant under the intense UAE sun,
              these layers are infused with UV inhibitors, preventing the fading
              that often plagues lesser materials. If you&apos;re seeking to
              elevate your home&apos;s narrative with a foundation that balances
              beauty and brawn, consider exploring the&nbsp;
              <a
                href="https://www.zandscarpets.com/our-products/laminate-flooring"
                target="_blank"
                rel="noopener noreferrer"
                className="text-our-blue underline"
              >
                bespoke flooring collections
              </a>
              &nbsp;available at Zands Carpets.
            </>,
          ]}
        />
      </article>
    </section>
  )
}

function Section({
  title,
  paragraphs,
  list,
  hasMarginTop = true,
}: {
  title?: string
  paragraphs?: React.ReactNode[]
  list?: string[]
  hasMarginTop?: boolean
}) {
  return (
    <section className={cn(hasMarginTop && 'mt-9')}>
      <h2 className="text-5xl leading-7 font-semibold">{title}</h2>
      {paragraphs &&
        paragraphs.map((paragraph, i) => (
          <p key={i} className="mt-3 text-base leading-5">
            {paragraph}
          </p>
        ))}
      {list && (
        <ul className="mt-4 space-y-3">
          {list.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-normal">
              <div>
                <CircleCheckIcon
                  className="text-our-purple stroke-1"
                  size={16}
                />
              </div>
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
