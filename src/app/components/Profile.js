'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Profile = () => {

    const router = useRouter()

    const [name, setName] = useState("No User");
    const [email, setEmail] = useState("No User");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [disable, setDisable] = useState(true);
    const [upName, setUpName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.displayName);
                setEmail(user.email);
                setProfilePhoto(user.photoURL)
                console.log(user);
            } else {
                setName("No User");
                setEmail("No User");
                router.push('/')
            }
        })
    }, [])

    const enableField = () => {
        setDisable(false)
        setUpName(name)
    }

    const updateUser = () => {
        setLoading(true)
        if (upName == "") {
            toast.error("Please enter your name")
            setDisable(false)
            setLoading(false)
        } else {
            updateProfile(auth.currentUser, {
                displayName: upName
            }).then((res) => {
                toast.success("Updated Profile")
                console.log(res);
                setDisable(true)
                setLoading(false)
                setUpName("")
            }).catch((error) => {
                setLoading(false)
                toast.error("Something went wrong...")
            })
        }
    }

    return (
        <>
            <Toaster />
            <div className='justify-center flex flex-col items-center top-32 relative px-8 xl:top-36 xl:px-16'>
                <img src={profilePhoto ? profilePhoto : '/assets/profile.svg'} alt="" className='w-20 h-20 rounded-full' />
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex justify-center items-center xl:gap-4">
                        <div className='flex justify-center items-center gap-4'>
                            <b>Name:</b>
                            <input
                                type="text"
                                disabled={disable}
                                name="text"
                                value={upName}
                                onChange={(e) => setUpName(e.target.value)}
                                className="rounded-md border-0 py-2 px-3 w-1/2 xl:w-3/4 xl:pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                                placeholder={name ? name : "Null"}
                            />
                        </div>
                        <div className="cursor-pointer hover:text-indigo-600 transition-all" onClick={enableField}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative right-6 xl:right-0">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className='flex justify-center items-center gap-4'>
                            <b>Email:</b>
                            <input
                                type="email"
                                disabled
                                name="email"
                                className="rounded-md border-0 py-2 px-3 w-1/2 xl:w-3/4 xl:pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                                placeholder={email}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center ml-9 xl:ml-0">
                        <button
                            className={`bg-indigo-600 text-white py-1 px-11 rounded-md hover:bg-indigo-500 ${disable ? 'disabled:opacity-75 disabled:hover:bg-indigo-600' : 'enabled:opacity-100'}`}
                            disabled={disable}
                            onClick={updateUser}
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile