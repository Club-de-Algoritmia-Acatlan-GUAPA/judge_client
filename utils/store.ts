import { create } from 'zustand'

type State = {
  theme: string
}

type Action = {
  setTheme: (theme: State['theme']) => void
}

export const useStore = create<State & Action>((set) => ({
  theme: 'light',
  setTheme: (theme: string) => set(() => ({ theme: theme })),
}))
