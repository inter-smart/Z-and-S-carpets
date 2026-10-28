const MIME_BY_EXTENSION: Record<string, string> = {
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  // .mov is almost always H.264/AAC, which browsers play when it is typed as mp4
  mov: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
  ogg: 'video/ogg',
  m3u8: 'application/vnd.apple.mpegurl',
}

// Prefer the API's mime type; otherwise infer from the extension. Returns undefined when unknown
// so the browser sniffs the file instead of being told something wrong.
export function getVideoMimeType(
  path?: string | null,
  mime?: string | null,
): string | undefined {
  if (mime) return mime === 'video/quicktime' ? 'video/mp4' : mime
  if (!path) return undefined
  const ext = path.split(/[?#]/)[0].split('.').pop()?.toLowerCase()
  return ext ? MIME_BY_EXTENSION[ext] : undefined
}

// iOS Safari paints no first frame (black tile) without a poster; a media fragment forces it.
export function withFirstFrameFragment(src: string, hasPoster: boolean) {
  return hasPoster || src.includes('#') ? src : `${src}#t=0.001`
}
