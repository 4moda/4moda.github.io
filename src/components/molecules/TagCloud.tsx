import type { Tag as TagItem } from '../../data/content'
import { Tag } from '../atoms'
import styles from './TagCloud.module.scss'

/** Spreads the tags evenly around the colour wheel. */
export function TagCloud({ tags }: { tags: TagItem[] }) {
  return (
    <ul className={styles.cloud}>
      {tags.map((tag, index) => (
        <Tag
          key={`${tag.label}-${index}`}
          label={tag.label}
          weight={tag.weight}
          hue={Math.round((360 / Math.max(tags.length, 1)) * index)}
        />
      ))}
    </ul>
  )
}
