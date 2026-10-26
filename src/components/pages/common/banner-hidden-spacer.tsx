// The navbar is fixed and <main> only reserves `mt-28` for it. The real header is taller than
// that (the inner banner sat in the overlap), so when an admin hides the banner this fills the
// difference. `--header-h` is set by the navbar from its measured height.
export default function BannerHiddenSpacer() {
  return (
    <div
      aria-hidden
      style={{ height: 'max(0px, calc(var(--header-h, 0px) - 7rem))' }}
    />
  )
}
