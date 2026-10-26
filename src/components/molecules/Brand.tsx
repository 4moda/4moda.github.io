import { profile } from '../../data/content'
import { cycleHue } from '../../lib/hueCycle'
import styles from './Brand.module.scss'

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <span className={styles.brand}>
      <button
        type="button"
        className={styles.mark}
        onClick={cycleHue}
        aria-label="Change colours"
        title="Change colours"
      />
      <a className={styles.name} href="#top" onClick={onNavigate}>
        {profile.handle}
      </a>
    </span>
  )
}
