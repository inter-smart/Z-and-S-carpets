import {
  MailOutlineIcon,
  PhoneOutlineIcon,
  WhatsAppOutlineIcon,
} from '@/assets/icons'
import Image from 'next/image'

const contact = {
  mail: 'info@zandscarpets.com',
  whatsapp: '+971 XX XXX XXXX',
  phone: '+971 5270 044 20',
}

export default function BottomSideBtns() {
  return (
    <div className="fixed bottom-14 ltr:right-2 ltr:sm:right-5 rtl:left-2 rtl:sm:left-5 flex flex-col-reverse gap-1.25 z-99">
      <a
        className="w-9.5 h-9.5 bg-[#812990] rounded-sm p-2.5 flex justify-center items-center"
        href={`mailto:${contact.mail}`}
        aria-label="Send us an email"
      >
        <Image
          src={MailOutlineIcon}
          alt="Phone Outline Icon"
          className="h-auto w-full"
        />
      </a>
      <a
        className="w-9.5 h-9.5 bg-[#72BF44] rounded-sm p-2.5 flex justify-center items-center"
        href={`https://wa.me/${contact.whatsapp.replaceAll(' ', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <Image
          src={WhatsAppOutlineIcon}
          alt="Phone Outline Icon"
          className="h-auto w-full"
        />
      </a>
      <a
        className="w-9.5 h-9.5 bg-[#0066B3] rounded-sm p-2.5 flex justify-center items-center"
        href={`tel:${contact.phone.replaceAll(' ', '')}`}
        aria-label="Call us"
      >
        <Image
          src={PhoneOutlineIcon}
          alt="Phone Outline Icon"
          className="h-auto w-full"
        />
      </a>
    </div>
  )
}
