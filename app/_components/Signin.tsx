"use client"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { loginwithgithub } from "@/lib/action"

export function SignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  return (
    <form
    className="text-white w-full h-screen flex items-center justify-center"
      onSubmit={async (e) => {
       e.preventDefault();
        setLoading(true)
        await loginwithgithub().then((res)=>{
          setLoading(false)
          window.location.pathname = '/'
        })
      }}
    >
      <button type="submit" disabled={error}  className={`${error ? 'bg-red-900/30 text-red-600 border-red-800': 'bg-gray-900'} border-gray-800 shadow-md   flex items-center gap-2 px-5 py-3 rounded-lg border-[1px] `}>
       <span className={`text-xl ${(loading)? 'animate-spin': ''}`}>
       {(loading) ?
        <AiOutlineLoading3Quarters />
       :
       <FaGithub/>
       }
        </span>
       <p>
         {(loading) ?
        'Loging in...'
       :
      'Continue with Github'
       }
        </p>
        </button>
    </form>
  )
} 