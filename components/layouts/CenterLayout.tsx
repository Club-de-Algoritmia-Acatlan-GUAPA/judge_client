import type { ReactElement } from 'react'

const style = {
  flex: 1,
  display: 'flex',
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
}
export default function CenterLayout(page: ReactElement) {
  return <main style={style}>{page}</main>
}
