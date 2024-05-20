'use client'

import { useRouter } from 'next/navigation'
import Login from './Login'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'

const Home = () => {

    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/chit-chat')
            } else {
                router.push('/')
            }
        })
    })

  return (
    <>
    <Login />
    </>
  )
}

export default Home