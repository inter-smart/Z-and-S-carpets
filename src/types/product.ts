export interface ProductCategoryType {
  id: string
  name: string
  description: string
  badge: string
  features: string[]
  image: string
}

export interface ProductItemType {
  // set for products from the API (the detail link uses it instead of the name)
  slug?: string
  name: string
  description: string
  image: string
  imageAlt?: string
  badge?: string
  category: string
  material: string
  color: string
  usage: string
  tags: string[]
}

export interface ProductColorType {
  label: string
  image: string
}
export interface DetailedDescriptionType {
  desc: string
  bullets: string[]
}
export interface DetailedPhotosType {
  title: string
  description: string
  image: string
}
export interface DetailedVideosType {
  title: string
  description: string
  src: string
  poster: string
}
export interface ProductDetailsType {
  name: string
  category: string
  description: string
  image: string
  tags: string[]
  specifications: string[]
  sizes: string[]
  colors: ProductColorType[]
  detailedDesc: DetailedDescriptionType
  detailPhotos: DetailedPhotosType[]
  detailVideos: DetailedVideosType[]
}
