import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const LoaderChat = () => {
  return (
    <div className='flex items-start animate-pulse gap-2 w-full '>
        <div className="pfp w-10 h-10  bg-zinc-700 rounded-full"></div>
        <div className="text flex flex-col gap-2">
            <div className="username bg-zinc-700 w-20 h-2 rounded-md"></div>
            <div className="date  bg-zinc-700 w-10 h-2 rounded-md"></div>
            <div className="text  bg-zinc-700 w-[50vw] h-4 rounded-md"></div>
        </div>
        <div className="button text-zinc-700">
            <BsThreeDotsVertical/>
        </div>
    </div>
  )
}

export default LoaderChat