import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LANG_STORAGE_KEY, LangContext, type L10n, type Lang } from './context'

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY)
    if (saved === 'ja' || saved === 'en') return saved
  } catch {
    // Private browsing or blocked storage: fall through to the browser locale.
  }
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('ja')) return 'ja'
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang)
    } catch {
      // Not remembering the choice is not worth breaking the page over.
    }
  }, [lang])

  const toggleLang = useCallback(() => setLang((prev) => (prev === 'ja' ? 'en' : 'ja')), [])
  const t = useCallback(<T,>(value: L10n<T>) => value[lang], [lang])

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, toggleLang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
