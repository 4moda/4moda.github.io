import { useState } from 'react'
import { sectionIds } from '../../data/content'
import { useActiveSection, useScrolled } from '../../lib/hooks'
import { Container, IconButton } from '../atoms'
import { Brand, ColorToggle, LangToggle, NavMenu, ThemeToggle } from '../molecules'
import styles from './SiteHeader.module.scss'

export function SiteHeader() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`.trim()}>
      <Container className={styles.inner}>
        <Brand onNavigate={() => setMenuOpen(false)} />

        <NavMenu
          sections={sectionIds}
          active={active}
          open={menuOpen}
          onNavigate={() => setMenuOpen(false)}
        />

        <div className={styles.actions}>
          <LangToggle />
          <ThemeToggle />
          <ColorToggle />
          <IconButton
            label="Menu"
            className={styles.menuButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </IconButton>
        </div>
      </Container>
    </header>
  )
}
