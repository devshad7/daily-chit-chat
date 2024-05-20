'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import Login from "./components/Login";

export default function page() {

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
  );
}
