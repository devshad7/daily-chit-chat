'use client'

import { auth, db } from '@/utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const BottomNav = () => {

    const dbCollection = collection(db, "chats");

    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName)
                setPhotoUrl(user.photoURL)
                setUserId(user.uid)
            }
        })
    }, [])

    useEffect(() => {
        const timeId = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: false }))
        }, 1000)

        return () => clearInterval(timeId);
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        if (userMessage == "") {
            toast.error("Enter Message")
        } else {
            addDoc(dbCollection, {
                name: userName,
                message: userMessage,
                uid: userId,
                createdTime: time,
                createdAt: serverTimestamp(),
            }).then((res) => {
                toast.success("Sent")
                setUserMessage("")
                console.log(res);
            }).catch((error) => {
                toast.error('Not Sent');
                console.log(error.message);
            })
        }
    }

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            sendMessage(event)
        }
    }

    return (
        <>
            <Toaster />
            <div className=" bottom-0 flex py-6 px-6 justify-center items-center fixed w-full md:px-10 lg:px-14 xl:px-16 xl:py-10 shadow-top z-50 bg-white gap-7">
                <div className="cursor-pointer p-3 hover:bg-slate-50 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-indigo-600 hover:transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <input
                    type="text"
                    name="text"
                    id="text"
                    onKeyDown={handleSubmit}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    className="block w-3/4 xl:w-2/4 rounded-md border-0 py-3 pl-5 xl:pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                    placeholder="Type here..."
                />
                <div className="cursor-pointer p-3 hover:bg-slate-50 rounded-full" onClick={sendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h- hover:text-indigo-600 hover:transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </div>
            </div>
        </>
    )
}

export default BottomNav