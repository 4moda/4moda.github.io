import styles from './Chip.module.scss'

export function Chip({ children, size = 'md' }: { children: string; size?: 'sm' | 'md' }) {
  return <li className={`${styles.chip} ${size === 'sm' ? styles.small : ''}`.trim()}>{children}</li>
}
