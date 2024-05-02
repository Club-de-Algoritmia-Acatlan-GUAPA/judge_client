import useSWR from 'swr'
import { createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import type { Contest } from '@utils/types'
import type { ReactElement } from 'react'
import { NavbarContest } from '@components/contest/navbarContest/navbarContest'

const ContestProvider = createContext<Contest>({
  id: '',
  name: '',
  startTime: undefined,
  endTime: undefined,
  bases: [],
})

export function useContest() {
  return useContext(ContestProvider)
}
export default function LayoutContest({ children }: any) {
  const r = useRouter()

  const { contest_id } = r.query
  const fetcher = (url: any) => fetch(url).then((r) => r.json())

  const { data, error } = useSWR<Contest>(`/api/contest/${contest_id}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <ContestProvider.Provider value={data}>
        {children}
      </ContestProvider.Provider>
    </>
  )
}

export function barLayout(navbar: ReactElement) {
  function Bar(page: ReactElement) {
    return (
      <>
        <div className='flex flex-col gap-6 layout'>
          {navbar}
          {/* <NavbarContest /> */}
          {page}
        </div>
      </>
    )
  }
  return Bar
}
