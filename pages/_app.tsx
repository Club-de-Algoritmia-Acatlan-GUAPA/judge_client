import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import Navbar from '@components/navbar/Navbar.client'

import '@styles/globals.scss'
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  isIndex?: string
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page)
  const router = useRouter()

  return (
    <>
      <div className='dark app dark-app'>
        {Component?.isIndex ? <></> : <Navbar />}
        {getLayout(<Component key={router.asPath} {...pageProps} />)}
      </div>
    </>
  )
}
