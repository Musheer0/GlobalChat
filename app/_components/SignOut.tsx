"use client"
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
//@ts-ignore
const SignOutComponent = ({className, children}) => {
  return (
   <div className={className} onClick={()=>{
    console.log('sign')
    signOut().then(()=>{
        window.location.pathname = '/sign-in'
        console.log('out')
    })
   }}>
    {children}
   </div>
  )
}

export default SignOutComponent