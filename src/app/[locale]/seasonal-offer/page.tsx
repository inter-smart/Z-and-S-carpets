import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { XIcon } from 'lucide-react'
import Image from 'next/image'

export default function SeasonalOffer() {
  return (
    <div className="container-wrapper flex h-100 items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Show Offer</Button>} />
        <DialogContent
          showCloseButton={false}
          className="flex min-w-[35vw] rounded-sm p-1.5 min-[300px]:h-100 sm:min-w-150 md:min-w-180 lg:min-w-200"
        >
          <DialogClose className="absolute top-2 right-2 z-50 focus:ring-0 focus:outline-none">
            <XIcon className="size-4" />
          </DialogClose>
          <div className="relative grid h-full w-full grid-rows-2 text-black sm:grid-cols-[auto_200px] sm:grid-rows-none">
            <div className="absolute -top-20 left-8 z-20 h-35 w-35 rounded-full bg-white sm:-top-10 rtl:right-8">
              <div className="bg-our-green ms-auto flex aspect-square h-33 w-33 items-center justify-center rounded-full text-white">
                <div className="font-bold">
                  <p className="text-[0.6rem]">UP TO</p>
                  <p className="flex flex-row space-x-0.5">
                    <span className="text-[2.6rem] leading-11">40</span>
                    <span className="pt-0.5 text-lg leading-5 tracking-widest">
                      %
                      <br />
                      OFF
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-full w-full overflow-hidden rounded-sm sm:h-full">
              <Image
                src={'/images/floor-img-12.webp'}
                alt="Premium Quality Flooring"
                fill
                className="z-10 object-cover"
              />
              <div className="absolute bottom-0 left-0 z-20 px-2 py-1 text-white sm:px-7 sm:py-5 rtl:right-0">
                <p className="text-lg font-bold tracking-wider uppercase sm:text-base">
                  Premium Quality
                </p>
                <p className="text-9xl leading-6 font-bold tracking-widest uppercase sm:text-4xl sm:leading-none">
                  Vinyl Flooring
                </p>
              </div>
            </div>

            <div className="relative flex h-full flex-col justify-around sm:justify-end">
              <div className="text-our-purple top-7 right-0 z-20 rounded-sm px-2 py-2 sm:absolute sm:bg-white rtl:right-auto rtl:left-0">
                {/* <p className="text-lg leading-5 font-bold tracking-widest uppercase min-[300px]:text-2xl min-[300px]:leading-6 sm:text-5xl sm:leading-12"> */}
                <p className="text-2xl leading-5 font-bold tracking-widest uppercase min-[300px]:text-5xl min-[300px]:leading-6 sm:text-[48px] sm:leading-12">
                  Special <br className="hidden sm:block" />
                  Seasonal <br className="hidden sm:block" />
                  Offers
                </p>
              </div>
              <div className="space-y-1 p-2 sm:space-y-4 sm:p-5">
                {/* <p className="text-sm leading-5 font-medium uppercase sm:text-xl"> */}
                <p className="text-3xl leading-5 font-medium uppercase">
                  Limited <br className="hidden sm:block" /> time only
                </p>
                <p className="text-sm max-sm:mt-2">
                  This offer is valid for your during this visit only. Session
                  expires in 30 mints
                </p>
                <Button className="our-btn bg-our-purple px-8! max-sm:mt-2">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
