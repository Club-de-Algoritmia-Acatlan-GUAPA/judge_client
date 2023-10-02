import type { ReactElement } from 'react'

const style = {
  flex: 1,
  display: 'flex',
  'flex-direction': 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow :'scroll',
  maxHeight:'calc(100vh - 50px)'
}
export default function CenterLayout(page: ReactElement) {
  return <main style={style}>{page}</main>
}

