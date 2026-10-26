import { useRef } from 'react'
import { links, profile, ui } from '../../data/content'
import { usePointerSpotlight } from '../../lib/hooks'
import { useLang } from '../../lib/i18n'
import { AnimatedText, Badge, Button, Container, Icon, Reveal } from '../atoms'
import { SocialLinks } from '../molecules'
import styles from './HeroSection.module.scss'

export function HeroSection() {
  const { lang, t } = useLang()
  const heroRef = useRef<HTMLElement>(null)
  usePointerSpotlight(heroRef)

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.plates} />
        <span className={styles.spotlight} />
        <span className={`${styles.shape} ${styles.shapeA}`} />
        <span className={`${styles.shape} ${styles.shapeB}`} />
        <span className={`${styles.shape} ${styles.shapeC}`} />
      </div>

      <Container>
        <div className={styles.inner}>
          <Reveal>
            {profile.availability && <Badge>{t(profile.availability)}</Badge>}

            <h1 className={styles.title}>
              {/* Kanji + reading in small type — JA only: "大河" alone reads
                  several ways, so this is what settles it. */}
              {lang === 'ja' && (
                <span className={styles.reading}>
                  {profile.name.ja}（{profile.reading}）
                </span>
              )}
              <AnimatedText
                key={lang}
                text={profile.name.en}
                className={`${styles.role} offsetText`}
                delay={0.1}
              />
            </h1>

            <p className={styles.meta}>
              <Icon name="pin" />
              {t(profile.location)}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className={styles.actions}>
              <Button href="#playground" icon="arrow" iconAfter>
                {t(ui.hero.cta)}
              </Button>
              <Button href="#contact" variant="ghost">
                {t(ui.hero.ctaSecondary)}
              </Button>
            </div>

            <div className={styles.links}>
              <SocialLinks links={links} />
            </div>
          </Reveal>
        </div>
      </Container>

      <span className={styles.scrollHint} aria-hidden="true">
        <span>scroll</span>
        <span className={styles.scrollDots} />
      </span>
    </section>
  )
}
