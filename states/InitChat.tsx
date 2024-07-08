"use client"
import { Message } from '@prisma/client';
import React, { useEffect, useRef } from 'react'
import { useChatStore } from './message';
import { getChats } from '@/lib/action';

const InitChat = () => {
    const {messages} = useChatStore()
    useEffect(()=>{
       const unsub = async()=>{
        const chats = await getChats()
            useChatStore.setState({messages: chats})
       }
       unsub()
    },[])
  return (
   <></>
  )
}

export default InitChat