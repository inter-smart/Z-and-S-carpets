import { LocaleType } from '@/i18n/types'

export type PageMeta = {
  title: string
  description: string
  keywords: string
}

// Keyed by pageKey (one entry per static/listing page). Add/remove keys to match
// this project's actual static pages. Falls back to this when the backend's
// `/api/frontend/meta-data?page=<pageKey>` lookup has no row yet.
export const defaultMeta: Record<string, Record<LocaleType, PageMeta>> = {
  home: {
    en: {
      title: 'Z&S Carpets',
      description: 'Z&S Carpets — quality flooring and carpet solutions.',
      keywords: 'Z&S Carpets, carpets, flooring',
    },
    ar: {
      title: 'زد اند إس للسجاد',
      description: 'زد اند إس للسجاد — حلول أرضيات وسجاد عالية الجودة.',
      keywords: 'سجاد، أرضيات',
    },
  },
  about: {
    en: {
      title: 'About Us | Z&S Carpets',
      description: 'Learn more about Z&S Carpets and what we do.',
      keywords: 'about Z&S Carpets',
    },
    ar: {
      title: 'من نحن | زد اند إس للسجاد',
      description: 'تعرف على زد اند إس للسجاد وما نقدمه.',
      keywords: 'من نحن',
    },
  },
  contact: {
    en: {
      title: 'Contact Us | Z&S Carpets',
      description: 'Get in touch with Z&S Carpets for inquiries and support.',
      keywords: 'contact Z&S Carpets, inquiries, support',
    },
    ar: {
      title: 'تواصل معنا | زد اند إس للسجاد',
      description: 'تواصل مع فريق زد اند إس للسجاد للاستفسارات أو الدعم.',
      keywords: 'التواصل، الدعم',
    },
  },
  services: {
    en: {
      title: 'Services | Z&S Carpets',
      description:
        'Explore the flooring and carpet services Z&S Carpets offers.',
      keywords: 'Z&S Carpets services',
    },
    ar: {
      title: 'الخدمات | زد اند إس للسجاد',
      description: 'استكشف خدمات الأرضيات والسجاد التي نقدمها.',
      keywords: 'الخدمات',
    },
  },
  products: {
    en: {
      title: 'Products | Z&S Carpets',
      description: 'Browse the full range of carpets and flooring products.',
      keywords: 'Z&S Carpets products, carpets, flooring',
    },
    ar: {
      title: 'المنتجات | زد اند إس للسجاد',
      description: 'تصفح مجموعتنا الكاملة من السجاد ومنتجات الأرضيات.',
      keywords: 'المنتجات',
    },
  },
  category: {
    en: {
      title: 'Categories | Z&S Carpets',
      description: 'Browse products by category.',
      keywords: 'Z&S Carpets categories',
    },
    ar: {
      title: 'الفئات | زد اند إس للسجاد',
      description: 'تصفح المنتجات حسب الفئة.',
      keywords: 'الفئات',
    },
  },
  works: {
    en: {
      title: 'Our Works | Z&S Carpets',
      description: 'See projects completed by Z&S Carpets.',
      keywords: 'Z&S Carpets works, projects',
    },
    ar: {
      title: 'أعمالنا | زد اند إس للسجاد',
      description: 'شاهد المشاريع التي أنجزتها زد اند إس للسجاد.',
      keywords: 'أعمالنا، المشاريع',
    },
  },
  blogs: {
    en: {
      title: 'Blogs | Z&S Carpets',
      description: 'Read the latest insights and updates from Z&S Carpets.',
      keywords: 'Z&S Carpets blog, insights',
    },
    ar: {
      title: 'المدونة | زد اند إس للسجاد',
      description: 'اطلع على أحدث المقالات والتحديثات من زد اند إس للسجاد.',
      keywords: 'مدونة',
    },
  },
  downloads: {
    en: {
      title: 'Downloads | Z&S Carpets',
      description: 'Download brochures and catalogs from Z&S Carpets.',
      keywords: 'Z&S Carpets downloads, brochure, catalog',
    },
    ar: {
      title: 'التحميلات | زد اند إس للسجاد',
      description: 'قم بتحميل الكتيبات والكتالوجات من زد اند إس للسجاد.',
      keywords: 'التحميلات',
    },
  },
  quotes: {
    en: {
      title: 'Get a Quote | Z&S Carpets',
      description: 'Request a quote from Z&S Carpets.',
      keywords: 'Z&S Carpets quote, request quote',
    },
    ar: {
      title: 'طلب عرض سعر | زد اند إس للسجاد',
      description: 'اطلب عرض سعر من زد اند إس للسجاد.',
      keywords: 'طلب عرض سعر',
    },
  },
  'privacy-policy': {
    en: {
      title: 'Privacy Policy | Z&S Carpets',
      description: 'Read the Z&S Carpets privacy policy.',
      keywords: 'Z&S Carpets privacy policy',
    },
    ar: {
      title: 'سياسة الخصوصية | زد اند إس للسجاد',
      description: 'اقرأ سياسة الخصوصية لزد اند إس للسجاد.',
      keywords: 'سياسة الخصوصية',
    },
  },
}

export const DefaultOgImage = '/web-app-manifest-512x512.png'

// the works page's meta row is saved under the page name `our-work`
defaultMeta['our-work'] = defaultMeta.works
