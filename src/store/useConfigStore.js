import { create } from 'zustand'

export const PART_NAMES = [
  'laces',
  'mesh',
  'caps',
  'inner',
  'sole',
  'stripes',
  'band',
  'patch',
]

const DEFAULT_COLORS = {
  laces: '#ffffff',
  mesh: '#e63946',
  caps: '#1d1d1f',
  inner: '#e5e5e5',
  sole: '#ffffff',
  stripes: '#1d1d1f',
  band: '#1d1d1f',
  patch: '#e63946',
}

export const useConfigStore = create((set) => ({
  colors: { ...DEFAULT_COLORS },
  activePart: null,
  finish: 'matte', // 'matte' | 'glossy'

  setColor: (part, color) =>
    set((state) => ({ colors: { ...state.colors, [part]: color } })),

  setActivePart: (part) => set({ activePart: part }),

  setFinish: (finish) => set({ finish }),

  reset: () => set({ colors: { ...DEFAULT_COLORS } }),
}))
