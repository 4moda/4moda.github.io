/** Hue offsets the palette cycles through, in degrees. */
const HUES = [0, 48, 96, 168, 228, 300]

/**
 * Advances --hue-base to the next step in HUES. Reads the current value
 * straight off the document instead of tracking its own state, so every
 * trigger (the logo, the header button) agrees on what "next" means even
 * though neither knows about the other.
 */
export function cycleHue() {
  const root = document.documentElement
  const current = Number.parseFloat(getComputedStyle(root).getPropertyValue('--hue-base')) || 0
  const index = HUES.indexOf(current)
  const next = HUES[(index + 1 + HUES.length) % HUES.length]
  root.style.setProperty('--hue-base', `${next}deg`)
}
