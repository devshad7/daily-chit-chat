'use client'

import { auth } from '@/utils/firebaseConfig'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Navbar = () => {

    const router = useRouter()

    const logoutUser = () => {
        signOut(auth)
            .then((res) => {
                toast.success("Logged Out")
                router.push('/')
            }).catch((error) => {
                toast.error("Something went wrong...")
            })
    }

    return (
        <>
        <Toaster />
            <div className="flex py-6 px-8 items-center justify-between fixed w-full md:px-10 lg:px-14 xl:px-16 xl:py-10 shadow-sm z-50 scroll-auto bg-white">
                <div className="">
                    <Link href={'/chit-chat'} className='no-tap-highlight'>
                    <h1 className='font-bold text-2xl'>Chit Chat</h1>
                    </Link>
                </div>
                <Popover className="relative mr-3">
                    <PopoverButton className={'focus:outline-none no-tap-highlight'}>
                        <div className="cursor-pointer bg-indigo-600 rounded-full p-2 hover:bg-indigo-500 hover:transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </PopoverButton>
                    <PopoverPanel anchor="bottom" className="flex flex-col mt-4 pt-3 px-8 bg-white shadow-lg pb-3 gap-2 rounded-md z-50">
                        <Link href={'/setting/profile'}>
                            <span className='hover:text-indigo-600'>Setting</span>
                        </Link>
                            <span className='hover:text-indigo-600 cursor-pointer' onClick={logoutUser}>Logout</span>
                    </PopoverPanel>
                </Popover>
            </div>
        </>
    )
}

export default Navbar