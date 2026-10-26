import { about, ui } from '../../data/content'
import { useLang } from '../../lib/i18n'
import { Container, Reveal } from '../atoms'
import { SectionHeading } from '../molecules'
import styles from './AboutSection.module.scss'

export function AboutSection() {
  const { t } = useLang()
  return (
    <section className={styles.section} id="about">
      <Container>
        <SectionHeading eyebrow={ui.sections.about} title={ui.sections.aboutLead} />
        <div className={styles.prose}>
          {t(about).map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 80}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
