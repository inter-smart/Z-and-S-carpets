import { OurIcon } from '@/components/ui/icon'

export default function QuotesEmptySection() {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="flex aspect-square w-40 items-center justify-center rounded-full bg-[#F4F4F4]/70 sm:w-45">
        <OurIcon name="empty-box-icon" className="size-25" />
      </div>
      <p className="mt-7 text-4xl font-medium">No Products Added Yet</p>
      <p className="mt-2 text-base">
        Your quote list is currently empty. Add products to continue with your
        inquiry.
      </p>
    </div>
  )
}
