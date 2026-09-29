import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from 'cn'
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
const formField = ['Name', 'Phone Number', 'Email', 'Company Name']

export default function GetASampleDialog() {
  const [openGetASampleFormDialog, setOpenGetASampleFormDialog] =
    useState(false)

  const handleForm = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Form submitted.')
    setOpenGetASampleFormDialog(false)
  }

  return (
    <Dialog
      open={openGetASampleFormDialog}
      onOpenChange={setOpenGetASampleFormDialog}
    >
      <DialogTrigger
        render={
          <button
            onClick={() => setOpenGetASampleFormDialog(true)}
            className="cursor-pointer font-medium focus:ring-0 focus:outline-none"
          >
            Get a sample
          </button>
        }
      />
      <DialogContent className="flex min-h-100 flex-row items-center justify-center rounded-sm bg-[#023260] p-5 text-white sm:min-w-120 md:p-10 lg:p-12">
        <form
          className="flex w-full flex-col items-start"
          onSubmit={handleForm}
        >
          <span className="our-heading mt-5">Get a Sample</span>
          <span className="our-text mt-1 font-normal">
            Request a sample before you choose.
          </span>
          <div className="mt-8 grid w-full grid-cols-1 gap-3">
            <input
              key={formField[0]}
              aria-label={formField[0]}
              placeholder={`${formField[0]}*`}
              required={true}
              className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
            />
            <input
              key={formField[1]}
              aria-label={formField[1]}
              placeholder={`${formField[1]}*`}
              required={true}
              type="tel"
              dir="ltr"
              pattern="[0-9\s\-\(\)\+]{7,20}"
              title="Allowed: digits, +, spaces, hyphens, parentheses"
              className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
            />
            <input
              key={formField[2]}
              aria-label={formField[2]}
              placeholder={`${formField[2]}*`}
              required={true}
              type="email"
              dir="ltr"
              className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
            />
            {/* Product Categories */}
            <Select items={categories} required>
              <SelectTrigger className="h-12! w-full rounded-sm border-white/20 bg-transparent px-5 text-sm data-placeholder:text-white/50">
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
              <SelectTrigger className="h-12! w-full rounded-sm border-white/20 bg-transparent px-5 text-sm data-placeholder:text-white/50">
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
          </div>
          <Button
            className="bg-our-purple our-btn hover:bg-our-purple ms-auto mt-10 w-fit rounded-sm border p-2 px-10 text-white"
            type="submit"
          >
            <span className="font-medium">Submit</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
