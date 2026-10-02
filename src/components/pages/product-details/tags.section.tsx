const tags = [
  'Hand Knotted Rugs',
  'Hand Tufted Rugs',
  'Handwoven Rugs',
  'Flatweave & Dhurries',
  'Shaggy Rugs',
  'Modern Rugs',
  'Contemporary Rugs',
  'Traditional & Persian Rugs',
  'Abstract Rugs',
  'Geometric Rugs',
  'Wool Rugs',
  'Living Room Rugs',
  'Bedroom Rugs',
  'Round Rugs',
  'Custom Rugs',
  'Outdoor Rugs',
  'Luxury Collection',
  'New Arrivals',
]

export default function TagsSection() {
  const moreTags = [...tags, ...tags, ...tags]

  return (
    <section className="container-wrapper pb-20">
      <div className="flex max-h-23 flex-wrap content-start gap-2 overflow-hidden">
        {moreTags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="rounded border border-[#CCCCCC] px-3 py-1 text-sm text-black"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
