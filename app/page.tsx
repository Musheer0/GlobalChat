import { auth } from '@/auth'
import React from 'react'
import ChatHeader from './_components/ChatHeader'
import SendMessage from './_components/SendMessage'
import ChatMessage from './_components/ChatMessage'
const page = async () => {
  const user = await auth()
  return (
    <div className='flex flex-col  pt-1 w-full h-full max-w-[1500px] text-white p-5 items-center justify-center'>
      <ChatHeader/>
      <ChatMessage/>
      <SendMessage/>
    </div>
  )
}

export default page