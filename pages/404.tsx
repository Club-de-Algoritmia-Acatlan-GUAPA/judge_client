import { type ChangeEvent, useReducer, useState } from 'react'
import { z } from 'zod'
import { postForm } from '@utils/fetchers'
import CenterLayout from '@components/layouts/CenterLayout'
import Ty from '@components/typography/typography'

const Page = () => {
  const style = {
    fontSize: '20vw',
    lineHeight: 'none',
  }
  const styleDiv = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  } as React.CSSProperties
  return (
    <>
      <div style={styleDiv}>
        <Ty type='h1' color='primary' style={style}>
          404 :(
        </Ty>
        <Ty type='h2' color='primary'>
          Aqui no hay nada que ver..
        </Ty>
      </div>
    </>
  )
}

Page.getLayout = CenterLayout
export default Page
