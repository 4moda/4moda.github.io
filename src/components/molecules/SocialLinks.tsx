import type { Link } from '../../data/content'
import { Icon } from '../atoms'
import styles from './SocialLinks.module.scss'

export function SocialLinks({ links }: { links: Link[] }) {
  return (
    <ul className={styles.list}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            className={styles.link}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            title={link.label}
          >
            <Icon name={link.icon} />
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
