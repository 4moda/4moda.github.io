import { useRef, type ReactNode } from 'react'
import { useInView } from '../../lib/hooks'
import styles from './Reveal.module.scss'

/** Fades its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'li' | 'article'
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref)

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${inView ? styles.visible : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
