import type { ReactNode } from 'react'
import styles from './Container.module.scss'

/** The one content column width used across the whole page. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.container} ${className}`.trim()}>{children}</div>
}
