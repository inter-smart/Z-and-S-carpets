'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  // Start playback automatically (muted) and retry on first user interaction if the browser blocks it
  autoplay?: boolean
  // Force the DOM `muted` property; React's `muted` attribute is unreliable for Safari autoplay
  muted?: boolean
}

export function useVideoPlayback({
  autoplay = false,
  muted = false,
}: Options = {}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  const safePlay = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
    } catch (err) {
      // AbortError: a pause()/new load interrupted play(); NotAllowedError: autoplay blocked
      if ((err as DOMException)?.name === 'NotSupportedError') setHasError(true)
    }
  }, [])

  const toggle = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) await safePlay()
    else video.pause()
  }, [safePlay])

  // Callback ref so it also runs for videos that mount later (e.g. the deferred hero video)
  const setRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node
      if (!node) return
      if (muted || autoplay) {
        node.muted = true
        node.defaultMuted = true
      }
      if (autoplay) void safePlay()
    },
    [muted, autoplay, safePlay],
  )

  useEffect(() => {
    if (!autoplay) return
    const retry = () => {
      const video = videoRef.current
      if (video?.paused) void safePlay()
    }
    const events = ['touchstart', 'click', 'keydown'] as const
    events.forEach((e) =>
      window.addEventListener(e, retry, { once: true, passive: true }),
    )
    return () => events.forEach((e) => window.removeEventListener(e, retry))
  }, [autoplay, safePlay])

  const handlers = {
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onEnded: () => setIsPlaying(false),
    onError: () => setHasError(true),
    onLoadedData: () => {
      if (autoplay) void safePlay()
    },
  }

  return { videoRef, setRef, isPlaying, hasError, toggle, handlers }
}
