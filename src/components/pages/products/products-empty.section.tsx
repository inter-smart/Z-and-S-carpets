import { OurIcon } from '@/components/ui/icon'

export default function ProductsEmptySection() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-10 text-center xl:flex-row xl:pt-40 xl:text-start">
      <div>
        <div className="flex aspect-square w-40 items-center justify-center rounded-full bg-[#F4F4F4]/70 sm:w-35">
          <OurIcon name="empty-search-icon" className="size-18" />
        </div>
      </div>
      <div className="mt-5 xl:ms-8 xl:mt-0">
        <p className="text-xl font-medium">No Results Found</p>
        <p className="mt-2 text-sm">
          No products matched your search. Try adjusting your filters or
          keywords.
        </p>
      </div>
    </div>
  )
}
