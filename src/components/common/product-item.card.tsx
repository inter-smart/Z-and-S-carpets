import { Button } from '@/components/ui/button'
import type { ProductItemType } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductItemCard({
  product,
}: {
  product: ProductItemType
}) {
  return (
    <article>
      <div className="relative h-45 overflow-hidden rounded-t-sm min-[450px]:h-70 sm:h-45 md:max-lg:h-35">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="h-full w-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-2 right-2 rounded-xs bg-white px-2 py-0.5 text-xs">
            {product.badge}
          </span>
        )}
      </div>
      <div className="border-our-blue rounded-b-sm border border-t-0 p-3 pb-6">
        <p className="text-xs uppercase">{product.category}</p>
        <h3 className="mt-1 line-clamp-1 text-base font-semibold">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-[#222]">
          {product.description}
        </p>
        <div className="mt-7 flex gap-2">
          <Button
            type="button"
            variant={'outline'}
            className="our-btn flex-1 rounded! border-black px-0! py-3! text-xs! font-semibold!"
            nativeButton={false}
            render={<Link href={`/products/${product.name}`} />}
          >
            View Details
          </Button>
          <Button
            type="button"
            className="bg-our-purple our-btn flex-1 rounded! px-0! py-3! text-xs! font-semibold!"
          >
            Add to Quote
          </Button>
        </div>
      </div>
    </article>
  )
}
