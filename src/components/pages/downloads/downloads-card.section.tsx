'use client'

import { Success_2Icon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { OurIcon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, type SubmitEvent } from 'react'

interface CardType {
  title: string
  description: string
}

export default function DownloadsCardSection() {
  const t = useTranslations('DownloadsPage.CardSection')

  const cards = t.raw('cards') as CardType[]
  const formField = t.raw('downloadFormDialog.fields') as string[]

  const [openDownloadFromDialog, setOpenDownloadFromDialog] = useState(false)
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

  const handleForm = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Form submitted.')
    setOpenDownloadFromDialog(false)
    setOpenSuccessDialog(true)
  }

  return (
    <>
      <section className="container-wrapper pt-12 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cards.map((card, i) => (
            <div
              key={i}
              className="border-our-blue grid grid-cols-1 gap-5 overflow-hidden rounded-md border p-8 sm:grid-cols-[1fr_auto]"
            >
              <div className="flex gap-5 sm:items-center">
                <div className="bg-our-green/10 h-fit w-fit p-4">
                  <OurIcon name="file-open" className="text-our-green size-8" />
                </div>
                <div className="flex-1 space-y-1 md:my-auto lg:my-0">
                  <p className="our-heading text-xl leading-7 font-medium">
                    {card.title}
                  </p>
                  <p className="text-sm">{card.description}</p>
                </div>
              </div>
              <Button
                className="our-btn bg-our-purple hover:bg-our-purple col-span-2 w-full px-8! sm:col-span-1 sm:my-auto sm:w-fit lg:col-span-2 lg:w-full xl:col-span-1"
                onClick={() => setOpenDownloadFromDialog(true)}
              >
                {t('downloadBtnLable')}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-12 flex w-full justify-center">
          <Button variant="outline" className="our-btn border-our-blue">
            {t('loadMoreBtnLable')}
          </Button>
        </div>
      </section>

      {/* Download Form Dialog */}
      <Dialog
        open={openDownloadFromDialog}
        onOpenChange={setOpenDownloadFromDialog}
      >
        <DialogContent className="flex min-h-100 min-w-[90vw] flex-row items-center justify-center rounded-sm bg-[#023260] p-5 text-white md:min-w-[70vw] md:p-10 lg:min-w-[60vw] lg:p-15 xl:min-w-[50vw] 2xl:min-w-180">
          <form
            className="flex w-full flex-col items-start"
            onSubmit={handleForm}
          >
            <span className="our-heading mt-5">
              {t('downloadFormDialog.title')}
            </span>
            <span className="our-text mt-3 font-normal">
              {t('downloadFormDialog.description')}
            </span>
            <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
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
                type="tel"
                dir="ltr"
                pattern="[0-9\s\-\(\)\+]{7,20}"
                title="Allowed: digits, +, spaces, hyphens, parentheses"
                className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
              />
              <input
                key={formField[2]}
                aria-label={formField[2]}
                placeholder={`${formField[2]}*`}
                required={true}
                type="email"
                dir="ltr"
                className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
              />
              <input
                key={formField[3]}
                aria-label={formField[3]}
                placeholder={formField[3]}
                className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
              />
            </div>
            <Button
              className="bg-our-purple our-btn hover:bg-our-purple ms-auto mt-10 w-fit rounded-sm border p-2 px-10 text-white"
              type="submit"
            >
              <span className="font-medium">
                {t('downloadFormDialog.submit')}
              </span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
        <DialogContent className="flex min-h-100 min-w-[35vw] flex-row items-center justify-center rounded-sm px-15! 2xl:min-w-125">
          <div className="flex flex-col items-center text-center text-black">
            <div className="h-25">
              <Image
                src={Success_2Icon}
                alt="Request Success"
                className="size-full"
              />
            </div>
            <span className="mt-7 text-xl font-medium">
              {t('successDialog.title')}
            </span>
            <span className="mt-2 text-sm leading-5 text-[#120D0D]">
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
