'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { OurIcon } from '@/components/ui/icon'
import { CloudCheckIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, type SubmitEvent } from 'react'

export default function GetInTouchSection() {
  const t = useTranslations('ContactPage.getInTouch')

  const formField = t.raw('fields') as string[]

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

  const handleForm = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Form submitted.')
    setOpenSuccessDialog(true)
  }

  return (
    <>
      <section>
        <form
          className="mt-14 h-fit rounded-md bg-[#023260] px-8 py-18 text-white"
          onSubmit={handleForm}
        >
          <h2 className="our-heading">{t('formTitle')}</h2>
          <div className="mt-8 space-y-3">
            <input
              key={formField[0]}
              aria-label={formField[0]}
              placeholder={`${formField[0]}*`}
              required={true}
              className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
            />
            <input
              key={formField[1]}
              aria-label={formField[1]}
              placeholder={`${formField[1]}*`}
              required={true}
              type="email"
              dir="ltr"
              className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
            />
            <input
              key={formField[2]}
              aria-label={formField[2]}
              placeholder={`${formField[2]}*`}
              required={true}
              type="tel"
              dir="ltr"
              pattern="[0-9\s\-\(\)\+]{7,20}"
              title="Allowed: digits, +, spaces, hyphens, parentheses"
              className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
            />
            <input
              key={formField[3]}
              aria-label={formField[3]}
              placeholder={formField[3]}
              className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
            />
            <label className="flex h-30 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-white/10 text-[10px] text-white/80 hover:border-white/20">
              <OurIcon name="cloud-upload" className="size-7 opacity-50" />
              <span className="text-xs font-light">{t('upload')}</span>
              <input type="file" className="sr-only" />
            </label>
          </div>
          <div className="mt-9 flex justify-end">
            <Button
              type="submit"
              className="bg-our-purple hover:bg-our-purple our-btn"
            >
              {t('submit')}
            </Button>
          </div>
        </form>
      </section>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
        <DialogContent className="flex min-h-100 min-w-[35vw] flex-row items-center justify-center rounded-sm 2xl:min-w-125">
          <div className="flex flex-col items-center text-center text-black">
            <CloudCheckIcon className="text-our-blue" size={100} />
            <span className="mt-5 text-2xl font-medium">
              {t('successDialog.title')}
            </span>
            <span className="our-text font-normal">
              {t('successDialog.description')}
            </span>
            <DialogClose className="bg-our-purple mt-5 w-fit rounded-sm border p-2 px-10 text-white">
              <span className="font-medium">{t('successDialog.btnLable')}</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
