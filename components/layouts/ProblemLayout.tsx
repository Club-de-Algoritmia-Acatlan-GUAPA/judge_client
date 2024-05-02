import type { ReactElement } from 'react'

const style = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow: 'scroll',
  maxHeight: 'calc(100vh - 50px)',
} as React.CSSProperties
export default function CenterLayout(page: ReactElement) {
  return <main style={style}>{page}</main>
}
