import { auth, db } from '@/utils/firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'

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
            console.log(snapshot.metadata);
        });

        return () => unsubscribe();

    }, [])

    useEffect(() => {
        const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
        scrollToBottom();
      }, [data]);

    return (
        <>
            <div className='top-[5.7rem] py-6 h-[82vh] flex flex-col gap-6 relative px-8 xl:top-[7.5rem] xl:py-8 xl:px-16 xl:h-[70vh] overflow-y-auto scrollbar'>
                {data.map(chat => (
                    <div className={`flex gap-2 py-3 px-4 rounded-lg ${chat.uid === currentUser?.uid ? 'self-end bg-indigo-50 rounded-br-none' : 'self-start bg-indigo-50 rounded-bl-none'}`} key={chat.id}>
                        <div className="">
                            <img
                                src={chat.photo ? chat.photo : "/assets/profile.svg"}
                                alt=""
                                className='w-6 h-6 rounded-full opacity-40'
                            />
                        </div>
                        <div className="leading-none flex flex-col">
                            <div className=" text-sm">
                                <b>{chat.name}</b>
                            </div>
                            <div className="w-40 relative leading-[18px] text-xs">
                                <p>{chat.message}</p>
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