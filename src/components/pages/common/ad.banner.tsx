import { Button } from '@/components/ui/button'

export function AdBanner1() {
  return (
    <div className="my-5 flex h-100 justify-end bg-[url('/images/floor-img-28.webp')] bg-cover bg-center lg:my-10">
      <div className="bg-our-purple me-3 flex h-full flex-col justify-between px-5 py-10 text-white sm:me-5 sm:p-10">
        <div className="font-bold">
          <p className="text-3xl">UP TO</p>
          <p className="flex flex-row space-x-1">
            <span className="text-[72px] leading-none">45</span>
            <span className="pt-1 text-9xl">
              %
              <br />
              OFF
            </span>
          </p>
        </div>
        <div className="mt-5">
          <p className="text-lg font-semibold tracking-widest">
            PREMIUM QUALITY
          </p>
          <strong className="mt-1 block text-9xl leading-none tracking-wider">
            VINYL
            <br />
            FLOORING
          </strong>
        </div>
        <p className="text-lg">LIMITED TIME ONLY</p>
        <Button variant={'outline'} className="our-btn mt-3 w-fit border-white">
          Shop Now
        </Button>
      </div>
    </div>
  )
}

export function AdBanner2() {
  return (
    <div className="my-5 flex h-100 items-end bg-[url('/images/floor-img-15.webp')] bg-cover bg-center p-4 lg:my-10">
      <div className="border border-white/70 bg-white/10 p-3 text-white backdrop-blur-xl sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
          <div className="font-bold">
            <p className="text-3xl">UP TO</p>
            <p className="flex flex-row space-x-1">
              <span className="text-[72px] leading-none">45</span>
              <span className="pt-1 text-9xl">
                %
                <br />
                OFF
              </span>
            </p>
          </div>
          <div className="mt-3 border-t pt-3 sm:ms-5 sm:mt-auto sm:border-s sm:border-t-0 sm:ps-5">
            <p className="text-lg font-semibold tracking-widest">
              PREMIUM QUALITY
            </p>
            <strong className="mt-1 block text-9xl leading-none tracking-wider">
              VINYL
              <br />
              FLOORING
            </strong>
          </div>
          <Button className="bg-our-purple our-btn mt-3 w-fit">Shop Now</Button>
        </div>
      </div>
    </div>
  )
}
