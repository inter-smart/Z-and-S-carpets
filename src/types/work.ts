export interface WorkItemType {
  id: string
  title: string
  category: string
  location: string
  btnLabel: string
  image: string
  details: {
    metadata: { label: string; value: string }[]
    heroImage: string
    paragraphs: string[]
    gallery: string[]
  }
}

export interface WorkCategoryType {
  id: string
  label: string
}
