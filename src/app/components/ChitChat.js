'use client'

import { auth } from '@/utils/firebaseConfig'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import Chat from './Chat'

const ChitChat = () => {

  const router = useRouter()

  const [email, setEmail] = useState("No User")
  const [name, setName] = useState("No User")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email)
        setName(user.displayName)
      }
       else {
        setEmail("No User")
        setName("No User")
        router.push('/')
      }
    })
  }, [])

  return (
    <>
      <Toaster />
      <Navbar />
      <Chat />
      <BottomNav />
    </>
  )
}

export default ChitChat