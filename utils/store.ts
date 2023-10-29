import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useState, useEffect } from 'react'

type State = {
  theme: string
  tab: string
}

type Action = {
  setTheme: (theme: State['theme']) => void
  setTab: (theme: State['tab']) => void
}

export const useStore = create<State & Action>((set) => ({
  theme: 'light',
  tab: 'Problem',
  setTheme: (theme: string) => set(() => ({ theme: theme })),
  setTab: (tab: string) =>
    set(() => {
      return { tab: tab }
    }),
}))

//type FullState = State & Action
//export const useAppStore = create(
//  persist(
//    (set, _) => ({
//      theme: 'light',
//      tab: 'Problem',
//      setTheme: (theme: string) => set(() => ({ theme: theme })),
//      setTab: (tab: string) =>
//        set(() => {
//          console.log('tab EQUAL', tab)
//          return { tab: tab }
//        }),
//    }),
//    {
//      name: 'zustand-store',
//    },
//  ),
//)

//export const useStore = <T, F>(
//  store: (callback: (state: T) => unknown) => unknown,
//  callback: (state: T) => F
//) => {
//  const result = store(callback) as F
//  const [data, setData] = useState<F>()
//
//  useEffect(() => {
//    setData(result)
//  }, [result])
//
//  return data
//}

//export const useStore = <F>(
//  store: (callback: (state: FullState) => unknown) => unknown,
//  callback: (state: FullState) => F,
//) => {
//  const result = store(callback) as F
//  const [data, setData] = useState<F>()
//
//  useEffect(() => {
//    setData(result)
//  }, [result])
//
//  return data
//}
