import Ty from '@components/typography/typography'
import style from '@styles/Navbar.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useStore } from '@utils/store'

export default function Navbar() {
  const [themeEmoji, setThemeEmoji] = useState<string>(' ')
  const setTheme = useStore((state) => state.setTheme)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let f = document.documentElement.getAttribute('data-theme')
      let emoji = f === 'dark' ? '🌞' : '🌛'
      if (f) {
        setTheme(f)
      }
      setThemeEmoji(emoji)
    }
  }, [])
  function changeTheme() {
    let f = document.documentElement.getAttribute('data-theme')
    let newTheme = f === 'dark' ? 'light' : 'dark'
    let emoji = f === 'dark' ? '🌛' : '🌞'
    localStorage.setItem('theme', newTheme)
    if (f) {
      setTheme(newTheme)
    }
    setThemeEmoji(emoji)
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <div className={style.navbar}>
      <div style={logoStyle}>
        <Image src='/guapa_ring.svg' alt='Guapa logo' width='50' height='50' />
        <Ty type='h1' font='inter' href='/' color='blue' clickable>
          Juez GUAPA
        </Ty>
      </div>
      <div className={style.childsContainer}>
        <Ty type='h3' color='primary' clickable>
          Problemas
        </Ty>
        <Ty type='h3' color='primary'>
          Log Out
        </Ty>
        <Ty clickable href="/login" type='h3' color='primary'>
          Log In
        </Ty>
        <Ty type='h2' color='primary' onClick={changeTheme} clickable>
          {themeEmoji}
        </Ty>
      </div>
    </div>
  )
}
