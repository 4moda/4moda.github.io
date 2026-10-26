import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './Button.module.scss'

type Props = {
  children: ReactNode
  /** Rendered as an anchor when given, as a button otherwise. */
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  icon?: IconName
  /** Place the icon after the label instead of before it. */
  iconAfter?: boolean
  external?: boolean
  title?: string
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  icon,
  iconAfter = false,
  external = false,
  title,
}: Props) {
  const className = `${styles.button} ${styles[variant]}`
  const glyph = icon ? <Icon name={icon} className={styles.icon} /> : null
  const body = (
    <>
      {!iconAfter && glyph}
      <span>{children}</span>
      {iconAfter && glyph}
    </>
  )

  if (href) {
    return (
      <a
        className={className}
        href={href}
        title={title}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {body}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick} title={title}>
      {body}
    </button>
  )
}
