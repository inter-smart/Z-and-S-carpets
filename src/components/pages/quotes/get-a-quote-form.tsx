'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from 'cn'
import type { SubmitEvent } from 'react'

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
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted')
  }

  return (
    <main className="z-20 my-15 w-200! rounded-md bg-white p-10 text-black sm:p-10 lg:p-12">
      <h1 className="our-heading">Get a Quote</h1>
      <p className="mt-3 text-sm">
        Fill in the details and we will get back at you shortly.
      </p>

      <form
        onSubmit={handleSubmit}
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
        <Button
          type="submit"
          className="bg-our-purple hover:bg-our-purple our-btn mt-5 w-fit"
        >
          Submit
        </Button>
      </form>
    </main>
  )
}
