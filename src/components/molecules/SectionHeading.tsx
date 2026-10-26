import type { L10n } from '../../lib/i18n'
import { useLang } from '../../lib/i18n'
import { Reveal } from '../atoms'
import styles from './SectionHeading.module.scss'

export function SectionHeading({ eyebrow, title }: { eyebrow: L10n; title: L10n }) {
  const { t } = useLang()
  return (
    <Reveal className={styles.head}>
      <p className={styles.eyebrow}>{t(eyebrow)}</p>
      <h2 className={`${styles.title} offsetText`}>{t(title)}</h2>
    </Reveal>
  )
}
