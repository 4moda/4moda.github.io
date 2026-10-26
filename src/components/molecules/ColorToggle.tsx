import { ui } from '../../data/content'
import { useLang } from '../../lib/i18n'
import { cycleHue } from '../../lib/hueCycle'
import { IconButton } from '../atoms'
import styles from './ColorToggle.module.scss'

/** Same palette rotation as clicking the logo, surfaced as an explicit control. */
export function ColorToggle() {
  const { t } = useLang()
  return (
    <IconButton label={t(ui.colorToggle)} onClick={cycleHue}>
      <span className={styles.swatch} aria-hidden="true" />
    </IconButton>
  )
}
