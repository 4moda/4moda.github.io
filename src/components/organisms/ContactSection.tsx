import { links, ui } from '../../data/content'
import { useLang } from '../../lib/i18n'
import { Button, Container, Reveal } from '../atoms'
import { SectionHeading } from '../molecules'
import styles from './ContactSection.module.scss'

export function ContactSection() {
  const { t } = useLang()
  return (
    <section className={styles.section} id="contact">
      <Container>
        <SectionHeading eyebrow={ui.sections.contact} title={ui.sections.contactLead} />
        <Reveal>
          <div className={styles.card}>
            <span className={styles.wash} aria-hidden="true" />
            <p className={styles.body}>{t(ui.contact.body)}</p>
            <ul className={styles.links}>
              {links.map((link, index) => (
                <li key={link.href}>
                  <Button
                    href={link.href}
                    icon={link.icon}
                    variant={index === 0 ? 'primary' : 'ghost'}
                    external
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
