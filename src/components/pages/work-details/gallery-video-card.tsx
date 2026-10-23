'use client'

import { cn } from 'cn'
import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

export default function GalleryVideoCard({
  src,
  poster,
}: {
  src: string
  poster: string | null
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleToggle = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      await video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div className="group relative h-50 overflow-hidden rounded-md sm:h-40 md:h-50 lg:h-60">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        muted
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster={poster ?? undefined}
      >
        <source src={src} />
      </video>

      <div
        className={cn(
          'bg-foreground/20 absolute inset-0 grid place-items-center transition-opacity',
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
        )}
      >
        <button
          type="button"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          onClick={handleToggle}
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
    </div>
  )
}
