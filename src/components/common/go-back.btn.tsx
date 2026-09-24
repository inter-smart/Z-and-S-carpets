'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function GoBackBtn({ ...props }) {
  const router = useRouter()

  return (
    <Button {...props} onClick={() => router.back()}>
      Go Back
    </Button>
  )
}
