import { certifications, playground, skillsIntro, ui } from '../../data/content'
import { useLang } from '../../lib/i18n'
import { Container, Reveal } from '../atoms'
import { SectionHeading, TagCloud } from '../molecules'
import styles from './PlaygroundSection.module.scss'

export function PlaygroundSection() {
  const { t } = useLang()
  const credentialTags = certifications.map((c) => ({ label: t(c.label), weight: c.weight }))

  return (
    <section className={styles.section} id="playground">
      <Container>
        <SectionHeading eyebrow={ui.sections.playground} title={ui.sections.playgroundLead} />

        <div className={styles.prose}>
          {t(skillsIntro).map((line, index) => (
            <Reveal key={line} delay={index * 80}>
              <p>{line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className={styles.certLabel}>{t(ui.sections.technology)}</p>
          <TagCloud tags={playground} />
        </Reveal>
        <Reveal delay={220} className={styles.certifications}>
          <p className={styles.certLabel}>{t(ui.sections.certifications)}</p>
          <TagCloud tags={credentialTags} />
        </Reveal>
      </Container>
    </section>
  )
}
