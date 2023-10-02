import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Navbar from '../components/navbar/Navbar.client'

export default function Home() {
  return <p>
  Signed in as
  </p>
}

