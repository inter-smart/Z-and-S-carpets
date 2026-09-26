import type { blogItemType } from '@/types/blog'
import { CircleCheckIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import BlogImgCarousal from './blog-img.carousal'

const paragraphs = [
  "A floor isn't merely a surface to be trodden upon; it's the silent canvas that anchors the entire narrative of a curated home. You likely believe that true luxury must be enduring, yet the abrasive reality of the UAE's fine desert sand often composed of silica particles as small as 0.1mm threatens to dull the luster of even the most exquisite interiors.",
  "Discover how the intricate engineering of high-end laminate preserves the soul of your home against the rigorous demands of daily life. We'll explore the technical provenance of AC5 ratings, the foundation that withstands unique environmental demands, supported by a maintenance protocol that treats your flooring as the cultural artifact it truly is.",
]

export function BlogDetailsSection() {
  const t2 = useTranslations('Blogs')

  const data = t2.raw('Items') as blogItemType[]
  const article = data[1]

  return (
    <section className="container-wrapper pt-10">
      <article className="rounded-md border border-[#d9d9d9] p-5 sm:p-7 lg:p-8">
        <Image
          src={article.image[0]}
          alt="Laminate flooring interior"
          width={880}
          height={580}
          className="mb-5 h-70 w-full rounded-sm object-cover md:float-right md:ms-10 md:h-60 md:w-3/7 xl:ms-20 xl:mb-10 xl:h-80 rtl:md:float-left"
        />
        <p className="text-our-purple text-xs">
          • {article.date} | {article.author}
        </p>
        <h1 className="mt-3 text-xl font-semibold sm:text-2xl">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-[#d9d9d9] px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-7 text-sm leading-6">{paragraphs[0]}</p>
        <p className="mt-8 text-sm leading-6">{paragraphs[1]}</p>
        <Section
          title="Key Takeaways"
          list={[
            'Unveil the scientific alchemy of the wear layer, where aluminum oxide crystals create a diamond-hard shield.',
            'Master the nuances of the Abrasion Criteria rating and rigorous Taber Test.',
            'Discover preservation techniques tailored for the UAE climate.',
            'Learn how laminate flooring scratch resistance acts as a silent guardian.',
            'Align your aesthetic vision with technical mastery.',
          ]}
        />
        <Section
          title="The Essence of Durability: Defining Laminate Flooring Scratch Resistance"
          text="To the discerning eye, the floor serves as the foundational soul of a residence; it is a silent stage where daily life unfolds with grace. Achieving true laminate flooring scratch resistance isn't merely a technical specification. It is an act of preserving the aesthetic integrity of a curated space against the inevitable friction of existence."
        />
        <Section
          title="The Aesthetic Cost of Surface Wear"
          text="In the sunlight of a Dubai afternoon, even the smallest imperfections become visible. Micro-scratches accumulate, stripping away the depth of color that initially drew the connoisseur to the design."
        />
        <BlogImgCarousal />
        <Section
          title="Laminate vs. Natural Wood: A Study in Resilience"
          text="While traditional wood flooring offers a timeless warmth, natural oils and lacquers possess a slower core compared to the mineral-infused surfaces of premium laminate. By choosing a surface engineered for scratch resistance, the homeowner bridges the gap between ancient aesthetic traditions and modern durability."
        />
        <Section
          title="Aluminium Oxide: The Invisible Armor"
          text="The presence of aluminum oxide provides a tactile experience that distinguishes artisanal collections from common alternatives. In a high-quality plank, the wear layer is applied with precision, offering a sophisticated texture rather than a sterile, plastic sensation."
        />
      </article>
    </section>
  )
}

function Section({
  title,
  text,
  list,
}: {
  title: string
  text?: string
  list?: string[]
}) {
  return (
    <section className="mt-9">
      <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
      {text && <p className="mt-3 text-sm leading-6">{text}</p>}
      {list && (
        <ul className="mt-4 space-y-3">
          {list.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-normal">
              <CircleCheckIcon className="text-our-purple stroke-1" size={16} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
