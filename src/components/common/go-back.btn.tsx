'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function GoBackBtn({ ...props }) {
  const router = useRouter()
  const t = useTranslations('NotFoundPage')

  return (
    <Button {...props} onClick={() => router.back()}>
      {t('buttons.goBack.label')}
    </Button>
  )
}
