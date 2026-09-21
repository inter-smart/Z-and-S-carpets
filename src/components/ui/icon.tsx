import type { SVGProps } from 'react'

import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  AwardIcon,
  BadgeCheckIcon,
  Building3StarIcon,
  Building_2Icon,
  BuildingIcon,
  ChevronDownIcon,
  CloudUploadIcon,
  FacebookIcon,
  FilePenIcon,
  GoogleIcon,
  InnovationIcon,
  InstagramIcon,
  InterSmartIcon,
  LinkedInIcon,
  Location_2Icon,
  LocationIcon,
  Mail_2Icon,
  Mail_3Icon,
  MailIcon,
  MenuIcon,
  PeopleFocusIcon,
  Phone_2Icon,
  PhoneIcon,
  Quote_2Icon,
  QuoteIcon,
  SearchIcon,
  SquareCheckIcon,
  WhatsApp_2Icon,
  WhatsAppIcon,
  XTwitterIcon,
  YouTubeIcon,
} from '@/assets/icons'

const icons = {
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-down': ArrowDownIcon,
  'building-3-star': Building3StarIcon,
  building: BuildingIcon,
  building_2: Building_2Icon,
  search: SearchIcon,
  'chevron-down': ChevronDownIcon,
  menu: MenuIcon,
  'file-pen': FilePenIcon,
  whatsapp: WhatsAppIcon,
  whatsapp_2: WhatsApp_2Icon,
  mail: MailIcon,
  mail_2: Mail_2Icon,
  phone: PhoneIcon,
  phone_2: Phone_2Icon,
  location: LocationIcon,
  quote: QuoteIcon,
  quote_2: Quote_2Icon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  xtwitter: XTwitterIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  google: GoogleIcon,
  intersmart: InterSmartIcon,
  'people-focus': PeopleFocusIcon,
  innovation: InnovationIcon,
  'badge-check': BadgeCheckIcon,
  award: AwardIcon,
  mail_3: Mail_3Icon,
  location_2: Location_2Icon,
  'cloud-upload': CloudUploadIcon,
  'square-check': SquareCheckIcon,
} as const

export type OurIconName = keyof typeof icons

type IconProps = SVGProps<SVGSVGElement> & {
  name: OurIconName
}

export function OurIcon({ name, ...props }: IconProps) {
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.error(`Unknown icon: "${name}"`)
    return null
  }

  return <IconComponent {...props} />
}
