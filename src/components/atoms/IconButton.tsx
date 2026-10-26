import type { ReactNode } from 'react'
import styles from './IconButton.module.scss'

type Props = {
  children: ReactNode
  label: string
  onClick: () => void
  className?: string
  'aria-expanded'?: boolean
}

export function IconButton({ children, label, onClick, className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${className}`.trim()}
      onClick={onClick}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  )
}
