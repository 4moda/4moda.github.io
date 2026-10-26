import { marquee, ui } from '../../data/content'
import { useLang } from '../../lib/i18n'
import { Marquee } from '../molecules'
import { AboutSection, ContactSection, HeroSection, PlaygroundSection } from '../organisms'
import { PageTemplate } from '../templates'

export function HomePage() {
  const { t } = useLang()
  return (
    <PageTemplate skipLinkLabel={t(ui.skipLink)}>
      <HeroSection />
      <AboutSection />
      <Marquee words={marquee} />
      <PlaygroundSection />
      <ContactSection />
    </PageTemplate>
  )
}
