import type { ReactNode } from 'react'
import { SiteFooter, SiteHeader } from '../organisms'
import { ScrollProgress } from '../molecules'
import styles from './PageTemplate.module.scss'

/** Page skeleton: progress bar, fixed header, content slot, footer. */
export function PageTemplate({
  children,
  skipLinkLabel,
}: {
  children: ReactNode
  skipLinkLabel: string
}) {
  return (
    <>
      <a className={styles.skipLink} href="#about">
        {skipLinkLabel}
      </a>
      <ScrollProgress />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
