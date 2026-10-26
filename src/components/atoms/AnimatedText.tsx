import styles from './AnimatedText.module.scss'

/**
 * Renders text one character at a time so it can animate in with a stagger.
 * The whole string stays readable to screen readers via aria-label.
 */
export function AnimatedText({
  text,
  className = '',
  delay = 0,
  step = 0.035,
}: {
  text: string
  className?: string
  /** Seconds before the first character starts. */
  delay?: number
  /** Seconds between characters. */
  step?: number
}) {
  return (
    <span className={`${styles.text} ${className}`.trim()} aria-label={text}>
      {[...text].map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`${styles.char} ${char === ' ' ? styles.space : ''}`.trim()}
          aria-hidden="true"
          style={{ animationDelay: `${delay + index * step}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
