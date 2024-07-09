"use client"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { loginwithgithub, loginwithgoogle } from "@/lib/action"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"

export function SignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  return (
<>
 <section className="w-full h-screen gap-2 flex flex-col items-center justify-center">
  <h1 className="text-xl font-semibold">Global Chat</h1>
 <form
    className="text-white flex items-center justify-center"
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
    <form
    className="text-white flex items-center justify-center"
      onSubmit={async (e) => {
       e.preventDefault();
        setLoading(true)
        await loginwithgoogle().then((res)=>{
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
<FcGoogle />

       }
        </span>
       <p>
         {(loading) ?
        'Loging in...'
       :
      'Continue with Google'
       }
        </p>
        </button>
    </form>
    <p className="text-xs text-zinc-400">By Creating an account you agree to our <Link href={'/policy'} className="text-white underline">terms and conditions</Link></p>
 </section>
</>
  )
} 