// Placeholder with the same section/grid heights as the real works block (avoids layout shift)
export default function WorksSkeleton() {
  return (
    <section
      className="bg-[#EFF9FE] pt-16 pb-12 lg:pt-24 lg:pb-18"
      aria-hidden="true"
    >
      <div className="container-wrapper">
        <div className="mx-auto h-10 w-64 animate-pulse rounded bg-[#dbeaf3]" />
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-10 w-28 animate-pulse rounded bg-[#dbeaf3]"
            />
          ))}
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="min-h-100 animate-pulse rounded-md bg-[#dbeaf3] lg:min-h-120 xl:min-h-140 2xl:min-h-160" />
          <div className="hidden min-h-120 animate-pulse rounded-md bg-[#dbeaf3] lg:block xl:min-h-140 2xl:min-h-160" />
        </div>
      </div>
    </section>
  )
}
