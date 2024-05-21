import { auth, db } from '@/utils/firebaseConfig'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const Chat = () => {

    const [data, setData] = useState([])
    const messagesEndRef = useRef(null)

    const currentUser = auth.currentUser;

    const dbCollection = collection(db, "chats");
    const q = query(dbCollection, orderBy('createdAt', 'desc'));

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const sortedData = docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setData(sortedData.reverse())
        });

        return () => unsubscribe();

    }, [])

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
        scrollToBottom();
    }, [data]);

    const deleteMsg = (messageId) => {
        const messageDoc = doc(dbCollection, messageId);
        deleteDoc(messageDoc)
            .then((res) => {
                toast.success("Deleted")
            }).catch((error) => {
                console.log(error.message);
                toast.error("Not Deleted")
            })
    }

    return (
        <>
            <div className='pb-24 pt-28 h-full flex flex-col gap-6 px-8 xl:pt-36 xl:pb-32 xl:px-16 overflow-y-auto scrollbar'>
                {data.map(chat => (
                    <div className={`flex gap-1 py-2 px-4 rounded-lg ${chat.uid === currentUser?.uid ? 'self-end bg-blue-400 text-white rounded-br-none' : 'self-start bg-blue-50 rounded-bl-none'}`} key={chat.id}>
                        <div className="">
                            <img
                                src={chat.photo ? chat.photo : "/assets/profile.svg"}
                                alt=""
                                className={`w-6 h-6 rounded-full ${chat.uid === currentUser?.uid ? 'opacity-100 bg-white' : 'opacity-40'}`}
                            />
                        </div>
                        <div className="leading-none flex flex-col">
                            <div className="flex justify-between text-xs">
                                <b>{chat.uid === currentUser?.uid ? 'Me' : chat.name}</b>
                                {chat.uid === currentUser?.uid && (
                                    <div className=" relative left-2 cursor-pointer rounded-full" onClick={() => deleteMsg(chat.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="w-auto max-w-40 flex justify-between relative leading-[15px]">
                                <p className='text-[10px]'>{chat.message}</p>
                                <i className='text-[8px] relative top-1 left-1 pl-1'>{chat.createdTime}</i>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </>
    )
}

export default Chat