import React, { useState, Suspense, lazy } from 'react'
import Button from '@components/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
const Spline = React.lazy(() => import('@splinetool/react-spline'))

export default function Home() {
  const r = useRouter()
  const textFont = {
    fontSize: 'min(10vw, 100px)',
    fontWeight: '900',
    color: 'var(--white)',
  } as React.CSSProperties
  const flex = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 5,
  } as React.CSSProperties
  const content = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignContent: 'center',
    flex: '1',
    backgroundColor: '#0B0C1F',
    position: 'relative',
    zIndex: 4,
    backgroundImage:
      'radial-gradient(at 98% 100%, hsla(240, 39%, 52%, 0.41) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(240, 48%, 14%, 1) 0px, transparent 50%)',
    backgroundRepeat: 'no-repeat',
  } as React.CSSProperties
  const curve = {
    height: '10vw',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: '1',
    background: 'var(--dark-secondary-color)',
    clipPath: 'url(#myCurve)',
  } as React.CSSProperties
  const parent = {
    filter: 'drop-shadow(0 -10px 21px rgba(45,84,241,0.28))',
    width: '100%',
    zIndex: 5,
  } as React.CSSProperties
  const styleSpline = {
    width: '40%',
    aspectRatio: '1/1',
  }
  function handleLogin() {
    r.push('/login')
  }
  function handleSignup() {
    r.push('/signup')
  }
  const [loading, setLoading] = useState<boolean>(true)
  return (
    <>
      <div style={content}>
        <svg width='0' height='0'>
          <defs>
            <clipPath id='myCurve' clipPathUnits='objectBoundingBox'>
              <path
                d='M 1,0
                L 1,1
                L 0,1
                C .5 .7, .8 .4, 1 0
                Z'
              />
            </clipPath>
          </defs>
        </svg>
        <div style={flex}>
          <div
            style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}
          >
            <div>
              <div style={textFont}>Code.</div>
              <div style={textFont}>Learn.</div>
              <div style={textFont}>Compete.</div>
            </div>
            <div style={{ display: 'flex', gap: '40px' }}>
              <Button onClick={handleLogin} color='blue'>
                {' '}
                Log In{' '}
              </Button>
              <Button onClick={handleSignup} color='green'>
                {' '}
                Sign Up{' '}
              </Button>
            </div>
          </div>
          <div style={styleSpline}>
            <Suspense
              fallback={
                <Image
                  src='/guapa_ring.svg'
                  alt='Guapa logo'
                  width='500'
                  height='500'
                />
              }
            >
              <Spline
                style={{ display: loading ? 'none' : 'revert' }}
                onLoad={() => setLoading(false)}
                scene='https://prod.spline.design/TAPXIm4M0o5mo3uE/scene.splinecode'
              />
            </Suspense>
            {loading ? (
              <h1
                style={{
                  fontSize: '35px',
                  color: 'white',
                  textAlign: 'center',
                  justifySelf: 'center',
                }}
                color='white'
              >
                Loading
              </h1>
            ) : (
              ''
            )}
          </div>
        </div>
        <div style={parent}>
          <div style={curve}></div>
        </div>

        <svg
          width='100%'
          height='100%'
          style={{ position: 'absolute', zIndex: -1, display: 'none' }}
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <pattern
              id='smallGrid'
              width='8'
              height='8'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 8 0 L 0 0 0 8'
                fill='none'
                stroke='gray'
                strokeWidth='0.5'
              />
            </pattern>
            <pattern
              id='grid'
              width='30'
              height='30'
              patternUnits='userSpaceOnUse'
            >
              <rect width='30' height='30' fill='' />
              <path
                d='M 30 0 L 0 0 0 30'
                fill='none'
                stroke='rgba(255, 255, 255, 0.1)'
                strokeWidth='1'
              />
            </pattern>
          </defs>

          <rect width='100%' height='100%' fill='url(#grid)' />
        </svg>
      </div>
    </>
  )
}
Home.isIndex = true
