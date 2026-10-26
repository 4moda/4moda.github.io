import styles from './Badge.module.scss'

export function Badge({ children }: { children: string }) {
  return (
    <p className={styles.badge}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </p>
  )
}
