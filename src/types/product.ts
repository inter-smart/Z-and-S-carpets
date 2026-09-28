export interface ProductCategoryType {
  id: string
  name: string
  description: string
  badge: string
  features: string[]
  image: string
}

export interface ProductItemType {
  name: string
  description: string
  image: string
  badge?: string
  category: string
  material: string
  color: string
  usage: string
  tags: string[]
}
