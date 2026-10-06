// Arabic/English UI strings. The English text is the key, so a missing translation
// falls back to English instead of showing a key. Each ar/*.ts file exports a default
// Record<english, arabic>; they are merged here so files can be edited independently.
// ponytail: language switch reloads the page instead of re-rendering through context —
// fine for a setting changed once; move to a store subscription if it ever needs to be live.

export type Lang = 'ar' | 'en'
const KEY = 'lang'

const read = (): Lang => {
  try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'ar' } catch { return 'ar' }
}

export const lang: Lang = read()

import review from './review'

// review.ts goes last so the editor's fixes win any clash between the ar/*.ts files.
const ar: Record<string, string> = Object.assign(
  {},
  ...Object.values(import.meta.glob<{ default: Record<string, string> }>('./ar/*.ts', { eager: true }))
    .map(m => m.default),
  review,
)

/** t('Hello {name}', { name }) — Arabic when the UI is Arabic, the English key otherwise. */
export function t(en: string, vars?: Record<string, string | number>): string {
  let s = lang === 'ar' ? (ar[en] ?? en) : en
  if (vars) for (const k in vars) s = s.split(`{${k}}`).join(String(vars[k]))
  return s
}

export function setLang(next: Lang) {
  try { localStorage.setItem(KEY, next) } catch { /* private mode: stays default */ }
  window.location.reload()
}

/** Called once before first render: sets <html lang/dir> for RTL layout and fonts. */
export function applyLang() {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

// Exposed for the self-check only.
export const _arTable = ar

// Dates: Gregorian calendar with Western digits in both languages (counters and weights
// read the same as on gym equipment). Pass `dateLocale` to toLocale*String and
// `dfLocale` to date-fns format().
import { arSA } from 'date-fns/locale'
export const dateLocale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US'
export const dfLocale = lang === 'ar' ? arSA : undefined
