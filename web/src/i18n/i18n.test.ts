import { describe, it, expect } from 'vitest'
import { t, _arTable } from './index'

// vitest.setup.ts pins lang=en, so t() returns the English key here; the Arabic
// table is checked directly.
describe('i18n', () => {
  it('interpolates and falls back to the English key', () => {
    expect(t('{n} sets', { n: 3 })).toBe('3 sets')
    expect(t('zz-untranslated-zz')).toBe('zz-untranslated-zz')
  })
  it('has Arabic for the nav', () => {
    for (const k of ['Home', 'Workouts', 'Programs', 'Food', 'Weight', 'Charity']) expect(_arTable[k], k).toBeTruthy()
  })
  it('every Arabic value keeps the same {placeholders} as its key', () => {
    const ph = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join()
    expect(Object.entries(_arTable).filter(([en, a]) => ph(en) !== ph(a))).toEqual([])
  })
})
