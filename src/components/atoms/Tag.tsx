import type { CSSProperties } from 'react'
import styles from './Tag.module.scss'

/**
 * A single word in the playground cloud. Size encodes how often it is used;
 * `hue` rotates this tag's slice of the palette so the cloud reads as a
 * rainbow and still follows the global hue when the logo is clicked.
 */
export function Tag({
  label,
  weight,
  hue = 0,
}: {
  label: string
  weight: 1 | 2 | 3
  hue?: number
}) {
  return (
    <li
      className={`${styles.tag} ${styles[`w${weight}`]}`}
      style={{ '--hue-shift': `calc(var(--hue-base) + ${hue}deg)` } as CSSProperties}
    >
      {label}
    </li>
  )
}
