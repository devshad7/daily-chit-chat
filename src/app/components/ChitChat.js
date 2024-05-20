'use client'

import { auth } from '@/utils/firebaseConfig'
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

const ChitChat = () => {

  const router = useRouter()

  const [email, setEmail] = useState("No User")
  const [nameUpdate, setNameUpdate] = useState("")
  const [name, setName] = useState("No User")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email)
        setName(user.displayName)
        console.log(user);
      }
       else {
        setEmail("No User")
        setName("No User")
      }
    })
  }, [])

  const updateName = () => {
    if (nameUpdate == "") {
      toast.error("Please enter your name")
    } else {
      updateProfile(auth.currentUser, {
        displayName: nameUpdate
      }).then((res) => {
        toast.success("Updated Profile")
        console.log(res);
        setNameUpdate("")
      }).catch((error) => {
        toast.error("Something went wrong...")
      })
    }
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <div className='top-28 relative px-8 xl:top-36 xl:px-16'>
        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>
      </div>
      <BottomNav />
    </>
  )
}

export default ChitChat