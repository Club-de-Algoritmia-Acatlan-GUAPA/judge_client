import type { ReactElement } from 'react'

const style = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
} as React.CSSProperties
export default function CenterLayout(page: ReactElement) {
  return <main style={style}>{page}</main>
}
