// Design tokens — the single definition of every colour the two apps draw with.
//
// Three consumers, three delivery mechanisms:
//   web/tailwind.config.ts   → `palette` becomes Tailwind colours; `cssVars()` is
//                              emitted as :root / .dark custom properties via addBase
//   web/src/index.css        → declares NO token values; it only consumes the vars
//   mobile/src/theme/theme.ts→ imports `surfaces` and `palette` directly
//
// This file must stay dependency-free. web/tailwind.config.ts deep-imports it rather
// than going through the package index, so that loading the Tailwind config doesn't
// drag axios, zustand and the API client into PostCSS.

export type SurfaceTokens = {
  base: string
  raised: string
  overlay: string
  border: string
  muted: string
  txPrimary: string
  txSecondary: string
  txMuted: string
  txInverse: string
}

export const surfaces: Record<'light' | 'dark', SurfaceTokens> = {
  light: {
    base: '#f6f7f6',
    raised: '#ffffff',
    overlay: '#eff1f0',
    border: '#E2E3E2',
    muted: '#eff1f0',
    txPrimary: '#2b3238',
    txSecondary: '#3C454E',
    txMuted: '#7d868e',
    txInverse: '#ffffff',
  },
  dark: {
    base: '#0e1615',
    raised: '#15201f',
    overlay: '#1b2928',
    border: '#263837',
    muted: '#1e2d2c',
    txPrimary: '#f1f4f3',
    txSecondary: '#a9b4b2',
    txMuted: '#6b7a78',
    txInverse: '#2b3238',
  },
}

// Theme-independent: these read the same on either surface.
export const palette = {
  brand: {
    50: '#e6f6f4', 100: '#c0e9e5', 200: '#8fd8d1', 300: '#55c3b9', 400: '#22b1a5',
    500: '#00A195', 600: '#008a80', 700: '#00746B', 800: '#005c55', 900: '#003f3a',
    DEFAULT: '#00A195',
  },
  violet: { 400: '#E0C890', 500: '#CEB26B', 600: '#a88d48', DEFAULT: '#CEB26B' },
  success: { 400: '#84D3A4', 500: '#009670', 800: '#166534', DEFAULT: '#009670' },
  warning: { 400: '#facc15', 500: '#eab308', 800: '#854d0e', DEFAULT: '#eab308' },
  error: { 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', DEFAULT: '#ef4444' },
} as const

export const accents = {
  // Darker cyan for accents sitting on light surfaces (the web login link colour).
  // Tailwind's cyan-600 — outside the brand ramp, which is tuned for dark surfaces.
  cyanEdge: '#00746B',
  // For text on a brand-tinted alert in light mode: cyanEdge measures 3.4:1 there,
  // below AA. This rung clears it on both the /10 and /20 tints.
  cyanEdgeDeep: '#005c55',
  // Near-black text on a solid warning-500 fill (e.g. "Apply all"), where both white
  // and the normal text colour fail contrast.
  warningText: '#1a1400',
  gradient: [palette.brand[700], palette.brand[500]] as const,
} as const

// THE RULE: text on a tinted feedback surface must clear WCAG AA (4.5:1) against that
// tint, in BOTH themes. alertContrast.test.ts fails the build if any pair below does not.
//
// The 400s were used for this originally, copied from web's .alert-* classes where they
// sit on a dark surface and read fine. Mobile is light-first and web has a light theme,
// and on a white card the same pairing measures 2.4:1 for error and 1.4:1 for warning.
// Every alert in both apps was below AA in a theme a user can actually be in.
//
// No single rung clears both themes - that is why this is a pair rather than a constant.
// The light values are the lightest rungs that pass on both the /10 and /20 tints.
// Same shape as `accent`: darker on light, lighter on dark.
export const semanticInk = {
  light: {
    error: palette.error[700],
    warning: palette.warning[800],
    success: palette.success[800],
    info: accents.cyanEdgeDeep,
  },
  dark: {
    error: palette.error[400],
    warning: palette.warning[400],
    success: palette.success[400],
    info: palette.brand[300],
  },
} as const

export type SemanticTone = keyof typeof semanticInk['light']

export const GRADIENT_CSS = `linear-gradient(135deg, ${palette.brand[700]} 0%, ${palette.brand[500]} 100%)`

// Surface tokens as the CSS custom properties web consumes. The var names are part of
// the contract with index.css and tailwind.config.ts's `var(--...)` colour aliases —
// they are spelled once, here.
export function cssVars(mode: 'light' | 'dark'): Record<string, string> {
  const s = surfaces[mode]
  return {
    '--surface-base': s.base,
    '--surface-raised': s.raised,
    '--surface-overlay': s.overlay,
    '--surface-border': s.border,
    '--surface-muted': s.muted,
    '--tx-primary': s.txPrimary,
    '--tx-secondary': s.txSecondary,
    '--tx-muted': s.txMuted,
    '--tx-inverse': s.txInverse,
    '--alert-error': semanticInk[mode].error,
    '--alert-warning': semanticInk[mode].warning,
    '--alert-success': semanticInk[mode].success,
    '--alert-info': semanticInk[mode].info,
    'color-scheme': mode,
  }
}
