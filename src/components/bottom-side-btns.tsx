import {
  MailOutlineIcon,
  PhoneOutlineIcon,
  WhatsAppOutlineIcon,
} from '@/assets/icons'
import Image from 'next/image'

export default function BottomSideBtns() {
  return (
    <div className="fixed bottom-14 ltr:right-2 ltr:sm:right-5 rtl:left-2 rtl:sm:left-5 flex flex-col-reverse gap-1.25 z-99">
      <div className="w-9.5 h-9.5 bg-[#812990] rounded-sm p-2.5 flex justify-center items-center">
        <Image
          src={MailOutlineIcon}
          alt="Phone Outline Icon"
          className="h-auto w-full"
        />
      </div>
      <div className="w-9.5 h-9.5 bg-[#72BF44] rounded-sm p-2.5 flex justify-center items-center">
        <Image
          src={WhatsAppOutlineIcon}
          alt="Phone Outline Icon"
          className="h-auto w-full"
        />
      </div>
      <div className="w-9.5 h-9.5 bg-[#0066B3] rounded-sm p-2.5 flex justify-center items-center">
        <Image
          src={PhoneOutlineIcon}
          alt="Phone Outline Icon"
          className="h-auto w-full"
        />
      </div>
    </div>
  )
}
