import { createContext } from 'react'

export type Lang = 'ja' | 'en'

/** A value that exists in both languages. */
export type L10n<T = string> = Record<Lang, T>

export type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Pick the current language out of a bilingual value. */
  t: <T,>(value: L10n<T>) => T
}

export const LangContext = createContext<LangContextValue | null>(null)

export const LANG_STORAGE_KEY = '4moda.lang'
