import { ui } from '../../data/content'
import { useLang } from '../../lib/i18n'
import styles from './LangToggle.module.scss'

export function LangToggle() {
  const { lang, toggleLang, t } = useLang()
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleLang}
      title={t(ui.langToggle)}
      aria-label={t(ui.langToggle)}
    >
      <span className={lang === 'ja' ? styles.on : ''}>JA</span>
      <span aria-hidden="true">/</span>
      <span className={lang === 'en' ? styles.on : ''}>EN</span>
    </button>
  )
}
