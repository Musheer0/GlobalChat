"use client"
import { User } from 'next-auth'
import React, { useEffect, useRef } from 'react'
import { useUserStore } from './user'
//@ts-ignore
const InitUser = ({user}) => {
    const initstate = useRef(false)
    useEffect(()=>{
    if(user){
        useUserStore.setState({user: user})
        initstate.current = true
    }
    },[])
  return (
    <>
    
    </>
  )
}

export default InitUser