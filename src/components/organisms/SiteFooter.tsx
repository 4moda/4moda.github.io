import { profile } from '../../data/content'
import { Container } from '../atoms'
import styles from './SiteFooter.module.scss'

// Resolved once at load: the copyright year must not change between renders.
const YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>
          © {YEAR} {profile.handle}
        </p>
      </Container>
    </footer>
  )
}
