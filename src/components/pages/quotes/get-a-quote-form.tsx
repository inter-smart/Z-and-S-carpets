'use client'

import { Success_1Icon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from 'cn'
import Image from 'next/image'
import { useState, type SubmitEvent } from 'react'

const categories = [
  { label: 'Product Category', value: null },
  { label: 'Artificial Grass', value: 'artificial-grass' },
  { label: 'Vinyl Flooring', value: 'vinyl-flooring' },
  { label: 'Deck Flooring', value: 'deck-flooring' },
  { label: 'Carpet Flooring', value: 'carpet-flooring' },
  { label: 'Wood Flooring', value: 'wood-flooring' },
]
const products = [
  { label: 'Product', value: null },
  { label: 'Landscaping Grass', value: 'landscaping-grass' },
  {
    label: 'Heterogeneous Vinyl Flooring',
    value: 'heterogeneous-vinyl-flooring',
  },
  { label: 'Plain Color Vinyl Flooring', value: 'plain-color-vinyl-flooring' },
  { label: 'Cresto Vinyl Flooring', value: 'cresto-vinyl-flooring' },
  { label: 'Wood Pattern Vinyl', value: 'wood-pattern-vinyl' },
]

export default function GetAQuoteForm() {
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

  const handleForm = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Form submitted.')
    setOpenSuccessDialog(true)
  }

  return (
    <>
      <div className="z-20 my-15 w-200! rounded-md bg-white p-10 text-black sm:p-10 lg:p-12">
        <h1 className="our-heading">Get a Quote</h1>
        <p className="mt-3 text-base">
          Fill in the details and we will get back at you shortly.
        </p>

        <form
          onSubmit={handleForm}
          className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <input
            required
            aria-label="Name"
            name="name"
            placeholder="Name"
            className="h-12 rounded-sm border border-black/20 px-5 text-sm placeholder:text-black"
          />
          <input
            required
            type="email"
            aria-label="Email"
            name="email"
            placeholder="Email"
            className="h-12 rounded-sm border border-black/20 px-5 text-sm placeholder:text-black"
            dir="ltr"
          />
          <input
            required
            aria-label="Phone"
            name="phone"
            placeholder="Phone"
            className="h-12 rounded-sm border border-black/20 px-5 text-sm placeholder:text-black"
            dir="ltr"
            type="tel"
            pattern="[0-9\s\-\(\)\+]{7,20}"
            title="Allowed: digits, +, spaces, hyphens, parentheses"
          />
          <input
            aria-label="Company"
            name="company"
            placeholder="Company"
            className="h-12 rounded-sm border border-black/20 px-5 text-sm placeholder:text-black"
          />

          {/* Product Categories */}
          <Select items={categories} required>
            <SelectTrigger className="h-12! w-full rounded-sm border-black/20 bg-transparent px-5 text-sm data-placeholder:text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-sm px-2">
              <SelectGroup>
                {categories.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className={cn(
                      'rounded-sm text-sm',
                      !item.value && 'text-black/40',
                    )}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Products */}
          <Select items={products} required>
            <SelectTrigger className="h-12! w-full rounded-sm border-black/20 bg-transparent px-5 text-sm data-placeholder:text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-sm px-2">
              <SelectGroup>
                {products.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className={cn(
                      'rounded-sm text-sm',
                      !item.value && 'text-black/40',
                    )}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <textarea
            aria-label="Additional Notes"
            name="notes"
            placeholder="Additional Notes"
            className="min-h-25 resize-y rounded-sm border border-black/20 px-5 py-3 text-sm placeholder:text-black sm:col-span-2"
          />
          <Button type="submit" className="bg-our-purple our-btn mt-5 w-fit">
            Submit
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
        <DialogContent className="flex min-h-100 min-w-[35vw] flex-row items-center justify-center rounded-sm px-15! 2xl:min-w-125">
          <div className="flex flex-col items-center text-center text-black">
            <div className="h-25">
              <Image
                src={Success_1Icon}
                alt="Inquiry Success"
                className="size-full"
              />
            </div>
            <span className="mt-7 text-4xl font-medium">
              Thank You for Your Inquiry
            </span>
            <span className="mt-2 text-base leading-5 text-[#120D0D]">
              We&apos;ve received your request and will contact you soon with
              the details.
            </span>
            <DialogClose className="bg-our-purple mt-5 w-fit rounded-sm border p-2 px-10 text-white">
              <span className="text-sm font-medium">Go Back</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
