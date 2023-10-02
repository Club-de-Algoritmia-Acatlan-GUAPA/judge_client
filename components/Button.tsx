import Ty from '@components/typography/typography'
import Image from 'next/image'
import React, { useRef } from 'react'
import Loading from '@components/Loading'
const Button: React.FC<{
  children: React.ReactNode
  onClick?: (e: any) => void
  color?: 'blue' | 'green'
  enable?: boolean
}> = ({ children, onClick = () => {}, color, enable = true }) => {
  const refButton = useRef<HTMLButtonElement>(null)
  const enableStyle = {
    background: `var(--${color}-primary)`,
    border: `1px solid var(--${color}-secondary)`,
    borderRadius: 'var(--border-radius)',
    width: '126px',
    padding: '0 10px 0 10px',
    height: '29px',
  }
  return (
    <>
      <button
        ref={refButton}
        onMouseDown={(_: any) => {
          if (refButton.current && enable) {
            refButton.current.style.background = 'var(--blue-primary-faded)'
          }
        }}
        onMouseUp={(_: any) => {
          if (refButton.current) {
            refButton.current.style.background = 'var(--blue-primary)'
          }
        }}
        onMouseOut={(_: any) => {
          if (refButton.current) {
            refButton.current.style.background = 'var(--blue-primary)'
          }
        }}
        style={enableStyle}
        onClick={enable ? onClick : () => {}}
      >
        <Ty color='white' type='h4'>
          {children}
        </Ty>
      </button>
    </>
  )
}
export const SubmitButton = ({
  onClick,
  loading,
}: {
  onClick: (e: any) => void
  loading: boolean
}) => {
  const upperBarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  } as React.CSSProperties
  return (
    <>
      <Button
        enable={!loading}
        onClick={loading ? () => {} : onClick}
        color='blue'
      >
        {loading ? (
          <Loading />
        ) : (
          <div style={upperBarStyle}>
            <Image
              width={18}
              height={18}
              alt='submit logo'
              src='/submit_plane.svg'
            />
            Submit
          </div>
        )}
      </Button>
    </>
  )
}

export default Button
