import styles from './Marquee.module.scss'

/** Filmstrip band of scrolling words, pulled from a canister. */
export function Marquee({ words }: { words: string[] }) {
  const track = (
    <div className={styles.track} aria-hidden="true">
      {words.map((word, index) => (
        <span className={styles.word} key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </div>
  )

  return (
    <div className={styles.marquee}>
      {track}
      {track}
      <span className={styles.canister} aria-hidden="true" />
    </div>
  )
}
