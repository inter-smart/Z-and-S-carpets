import { Button } from '@/components/ui/button'
import type { ProductItemType } from '@/types/product'
import Image from 'next/image'

export default function ProductItemCard({
  product,
}: {
  product: ProductItemType
}) {
  return (
    <article className="bg-white">
      <div className="relative h-45 overflow-hidden rounded-t-sm min-[450px]:h-70 sm:h-45 md:max-lg:h-35">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="h-full w-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 rounded bg-white px-2 py-0.5 text-[0.55rem]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="border-our-blue rounded-b-sm border border-t-0 p-3 pb-6">
        <p className="text-[0.6rem] uppercase">{product.category}</p>
        <h3 className="mt-1 line-clamp-1 text-sm font-semibold">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs text-[#222]">
          {product.description}
        </p>
        <div className="mt-7 flex gap-2">
          <Button
            type="button"
            variant={'outline'}
            className="flex-1 rounded border border-black py-3 text-[9px] font-semibold hover:bg-white"
          >
            View Details
          </Button>
          <Button
            type="button"
            className="bg-our-purple hover:bg-our-purple flex-1 rounded py-3 text-[9px] font-semibold text-white"
          >
            Add to Quote
          </Button>
        </div>
      </div>
    </article>
  )
}
