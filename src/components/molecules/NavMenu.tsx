import { ui, type SectionId } from '../../data/content'
import { useLang } from '../../lib/i18n'
import styles from './NavMenu.module.scss'

export function NavMenu({
  sections,
  active,
  open,
  onNavigate,
}: {
  sections: readonly SectionId[]
  active: string
  open: boolean
  onNavigate: () => void
}) {
  const { t } = useLang()
  return (
    <nav
      className={`${styles.nav} ${open ? styles.open : ''}`.trim()}
      aria-label={t(ui.nav.label)}
    >
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.item} ${active === id ? styles.active : ''}`.trim()}
          onClick={onNavigate}
        >
          {t(ui.nav.items[id])}
        </a>
      ))}
    </nav>
  )
}
