import type { CSSProperties, ReactNode } from 'react'
import styles from './Card.module.scss'

export function Card({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <article className={`${styles.card} ${className}`.trim()} style={style}>
      {children}
    </article>
  )
}
