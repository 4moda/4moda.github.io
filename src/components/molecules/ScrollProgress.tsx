import { useScrollProgress } from '../../lib/hooks'
import styles from './ScrollProgress.module.scss'

/** Thin gradient bar across the top showing how far down the page you are. */
export function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
