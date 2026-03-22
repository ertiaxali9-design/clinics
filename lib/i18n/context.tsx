'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { translations, type Locale, type TranslationKeys } from './translations'

type TranslationFunction = (key: string) => string

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationFunction
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const LOCALE_KEY = 'marte-locale'

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let result: unknown = obj
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      return path // Return key if not found
    }
  }
  
  return typeof result === 'string' ? result : path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ka')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(LOCALE_KEY) as Locale | null
    if (saved && ['ka', 'en', 'ru'].includes(saved)) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_KEY, newLocale)
  }, [])

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key)
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

export function useTranslation() {
  const context = useContext(I18nContext)
  const locale = context?.locale ?? 'ka'
  return translations[locale]
}
