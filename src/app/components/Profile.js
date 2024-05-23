'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, dbStorage } from '@/utils/firebaseConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Profile = () => {

    const router = useRouter()

    const [name, setName] = useState("No User");
    const [email, setEmail] = useState("No User");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [disable, setDisable] = useState(true);
    const [upName, setUpName] = useState("");
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.displayName);
                setEmail(user.email);
                setProfilePhoto(user.photoURL)
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
                displayName: upName,
            }).then((res) => {
                toast.success("Profile Updated")
                setDisable(true)
                setLoading(false)
                setUpName("")
            }).catch((error) => {
                setLoading(false)
                console.log(error.message);
                toast.error("Something went wrong...")
            })
        }
    }

    const handleFileChange = (e) => {
        e.preventDefault()
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }

        if (!selectedFile) return;

        const storageRef = ref(dbStorage, `uploads/${selectedFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, selectedFile)

        uploadTask.then(() => getDownloadURL(uploadTask.snapshot.ref))
            .then((downloadURL) => {
                updateProfile(auth.currentUser, {
                    photoURL: downloadURL
                }).then(() => {
                    toast.success('Photo Updated')
                })
            }).catch((error) => {
                toast.error("Failed");
                console.log(error.message);
            })
    };

    return (
        <>
            <Toaster />
            <div className='justify-center flex flex-col items-center top-32 relative px-8 xl:top-36 xl:px-16'>
                <div className="profile-pic">
                    <label className="-label" htmlFor="file">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                        </span>
                    </label>
                    <input id="file" type="file" onChange={handleFileChange} />
                    <img src={profilePhoto ? profilePhoto : '/assets/profile.svg'} />
                </div>
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex justify-center items-center xl:gap-4">
                        <div className='flex justify-center items-center gap-4'>
                            <b>Name:</b>
                            <input
                                type="text"
                                disabled={disable}
                                name="text"
                                value={upName === null ? "" : upName}
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