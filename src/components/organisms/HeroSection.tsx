import { useRef, useState, type CSSProperties } from 'react'
import { links, profile, ui } from '../../data/content'
import { useShapeDodge, usePointerSpotlight } from '../../lib/hooks'
import { useLang } from '../../lib/i18n'
import { AnimatedText, Badge, Button, Container, Icon, Reveal } from '../atoms'
import { SocialLinks } from '../molecules'
import styles from './HeroSection.module.scss'

/** Fixed per-shape kick direction, so a click reads as a consistent "swat". */
const KICKS: Record<'a' | 'b' | 'c', { x: string; y: string }> = {
  a: { x: '38px', y: '-30px' },
  b: { x: '-34px', y: '26px' },
  c: { x: '30px', y: '32px' },
}

/** A floating shape that dodges the cursor and pops when clicked. */
function DodgeShape({
  id,
  dodgeRef,
  positionClass,
  shapeClass,
}: {
  id: 'a' | 'b' | 'c'
  dodgeRef: React.RefObject<HTMLSpanElement | null>
  positionClass: string
  shapeClass: string
}) {
  const [kicked, setKicked] = useState(false)
  const kick = KICKS[id]

  return (
    <span
      ref={dodgeRef}
      className={`${styles.shapeDodge} ${positionClass} ${kicked ? styles.kicked : ''}`.trim()}
      style={{ '--kick-x': kick.x, '--kick-y': kick.y } as CSSProperties}
      onClick={() => setKicked(true)}
      onAnimationEnd={() => setKicked(false)}
    >
      <span className={`${styles.shape} ${shapeClass}`} />
    </span>
  )
}

export function HeroSection() {
  const { lang, t } = useLang()
  const heroRef = useRef<HTMLElement>(null)
  usePointerSpotlight(heroRef)

  const shapeARef = useRef<HTMLSpanElement>(null)
  const shapeBRef = useRef<HTMLSpanElement>(null)
  const shapeCRef = useRef<HTMLSpanElement>(null)
  useShapeDodge(heroRef, [shapeARef, shapeBRef, shapeCRef])

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.plates} />
        <span className={styles.spotlight} />
        <DodgeShape id="a" dodgeRef={shapeARef} positionClass={styles.dodgeA} shapeClass={styles.shapeA} />
        <DodgeShape id="b" dodgeRef={shapeBRef} positionClass={styles.dodgeB} shapeClass={styles.shapeB} />
        <DodgeShape id="c" dodgeRef={shapeCRef} positionClass={styles.dodgeC} shapeClass={styles.shapeC} />
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
