import { Chip } from '../atoms'
import styles from './ChipList.module.scss'

export function ChipList({ items, size = 'md' }: { items: string[]; size?: 'sm' | 'md' }) {
  if (items.length === 0) return null
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <Chip key={item} size={size}>
          {item}
        </Chip>
      ))}
    </ul>
  )
}
