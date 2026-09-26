// import data from '@/data/blogs.json'
import Image from 'next/image'

const article = data.articles[0]
const paragraphs = [
  "A floor isn't merely a surface to be trodden upon; it's the silent canvas that anchors the entire narrative of a curated home. You likely believe that true luxury must be enduring, yet the abrasive reality of the UAE's fine desert sand often composed of silica particles as small as 0.1mm threatens to dull the luster of even the most exquisite interiors.",
  "Discover how the intricate engineering of high-end laminate preserves the soul of your home against the rigorous demands of daily life. We'll explore the technical provenance of AC5 ratings, the foundation that withstands unique environmental demands, supported by a maintenance protocol that treats your flooring as the cultural artifact it truly is.",
]

export function BlogDetailsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-4 sm:px-10 lg:px-[4.5%]">
      <article className="mx-auto max-w-[1100px] rounded border border-[#d9d9d9] p-5 sm:p-7 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
          <div>
            <p className="text-[9px] text-[#92279e]">
              • November 10, 2025 | {article.author}
            </p>
            <h1 className="mt-3 text-[22px] leading-tight font-semibold sm:text-[25px]">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[#d9d9d9] px-2 py-1 text-[9px]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-7 text-[11px] leading-[1.65]">{paragraphs[0]}</p>
          </div>
          <Image
            src={article.image}
            alt="Laminate flooring interior"
            width={880}
            height={580}
            className="h-[255px] w-full rounded object-cover"
          />
        </div>
        <p className="mt-8 text-[11px] leading-[1.65]">{paragraphs[1]}</p>
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
        <div className="my-8 grid gap-3 sm:grid-cols-2">
          <Image
            src="/images/category-wood.png"
            alt="Warm wood flooring interior"
            width={700}
            height={500}
            className="h-[230px] w-full rounded object-cover"
          />
          <Image
            src={article.image}
            alt="Laminate floor detail"
            width={700}
            height={500}
            className="h-[230px] w-full rounded object-cover"
          />
        </div>
        <Section
          title="Laminate vs. Natural Wood: A Study in Resilience"
          text="While traditional wood flooring offers a timeless warmth, natural oils and lacquers possess a slower core compared to the mineral-infused surfaces of premium laminate. By choosing a surface engineered for scratch resistance, the homeowner bridges the gap between ancient aesthetic traditions and modern durability."
        />
        <Section
          title="Aluminium Oxide: The Invisible Armor"
          text="The presence of aluminum oxide provides a tactile experience that distinguishes artisanal collections from common alternatives. In a high-quality plank, the wear layer is applied with precision, offering a sophisticated texture rather than a sterile, plastic sensation."
        />
      </article>
    </main>
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
      <h2 className="text-[18px] font-semibold">{title}</h2>
      {text && <p className="mt-3 text-[11px] leading-[1.65]">{text}</p>}
      {list && (
        <ul className="mt-4 space-y-3">
          {list.map((item) => (
            <li key={item} className="flex gap-3 text-[11px] leading-[1.5]">
              <span className="mt-1 text-[#92279e]">⊙</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
