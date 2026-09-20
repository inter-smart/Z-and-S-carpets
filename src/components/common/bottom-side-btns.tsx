import { OurIcon } from '@/components/ui/icon'

const contacts = {
  mail: 'info@zandscarpets.com',
  whatsapp: '+971 XX XXX XXXX',
  phone: '+971 5270 044 20',
}

export default function BottomSideBtns() {
  return (
    <div className="fixed bottom-14 z-99 flex flex-col-reverse gap-1.25 ltr:right-2 ltr:sm:right-5 rtl:left-2 rtl:sm:left-5">
      <a
        className="flex h-9.5 w-9.5 items-center justify-center rounded-sm bg-[#812990] p-2.5"
        href={`mailto:${contacts.mail}`}
        aria-label="Send us an email"
      >
        <OurIcon name="mail" className="size-5 text-white" />
      </a>
      <a
        className="flex h-9.5 w-9.5 items-center justify-center rounded-sm bg-[#72BF44] p-2.5"
        href={`https://wa.me/${contacts.whatsapp.replaceAll(' ', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <OurIcon name="whatsapp" className="size-5 text-white" />
      </a>
      <a
        className="flex h-9.5 w-9.5 items-center justify-center rounded-sm bg-[#0066B3] p-2.5"
        href={`tel:${contacts.phone.replaceAll(' ', '')}`}
        aria-label="Call us"
      >
        <OurIcon name="phone" className="size-5 text-white" />
      </a>
    </div>
  )
}
