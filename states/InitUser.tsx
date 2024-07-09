"use client"
import { User } from 'next-auth'
import React, { useEffect, useRef } from 'react'
import { useUserStore } from './user'
import { getUser } from '@/lib/action'
//@ts-ignore
const InitUser = ({user}) => {
    const initstate = useRef(false)
    useEffect(()=>{
      const unsub = async()=>{
        if(user) {
             const currentUser = await getUser(user?.user?.id) || user
             const newUser = {user: currentUser, expires: user.expires}
             //@ts-ignore
             useUserStore.setState({user:newUser})
             initstate.current = true
        }
      }
      unsub()

    },[])
  return (
    <>
    
    </>
  )
}

export default InitUser