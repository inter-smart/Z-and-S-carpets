'use client'

import { useVideoPlayback } from '@/hooks/use-video-playback'
import { getVideoMimeType, withFirstFrameFragment } from '@/lib/video'
import { cn } from 'cn'
import { Pause, Play } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function GalleryVideoCard({
  src,
  poster,
}: {
  src: string
  poster: string | null
}) {
  const t = useTranslations('Common.Video')
  const { setRef, isPlaying, hasError, toggle, handlers } = useVideoPlayback({
    muted: true,
  })

  return (
    <div className="group relative h-50 overflow-hidden rounded-md sm:h-40 md:h-50 lg:h-60">
      <video
        ref={setRef}
        className="h-full w-full object-cover"
        playsInline
        muted
        loop
        preload="metadata"
        poster={poster ?? undefined}
        {...handlers}
      >
        <source
          src={withFirstFrameFragment(src, !!poster)}
          type={getVideoMimeType(src)}
        />
      </video>

      {hasError ? (
        <div className="bg-foreground/60 absolute inset-0 grid place-items-center px-2 text-center text-sm text-white">
          {t('unavailable')}
        </div>
      ) : (
        <div
          className={cn(
            'bg-foreground/20 absolute inset-0 grid place-items-center transition-opacity',
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
          )}
        >
          <button
            type="button"
            aria-label={isPlaying ? t('pause') : t('play')}
            onClick={toggle}
            className="grid cursor-pointer place-items-center text-sm focus:ring-0 focus:outline-none"
          >
            <span className="bg-background grid size-7 place-items-center rounded-full text-[#0066B3]">
              {isPlaying ? (
                <Pause className="size-3 fill-current stroke-1" />
              ) : (
                <Play className="size-3 fill-current stroke-1" />
              )}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
