type Titled = { title: string; title_ar: string }

// /api/frontend/sample-request/options — the dropdowns of the "Get a sample" form
export type SampleOptionsData = {
  categories: (Titled & { slug: string })[]
  products: (Titled & { slug: string; category_slug: string })[]
}
