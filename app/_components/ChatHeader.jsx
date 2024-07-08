import React from 'react'
import UserInfo from './UserInfo'

import OnlineUsers from './OnlineUsers'
const ChatHeader = () => {
  return (
<>

<div className='flex  items-center  justify-between border-b-[1px] border-gray-700 pb-2 w-full'>
       
       <div className="left flex-1 flex flex-col ">
       <h1 className=' '>
       DailyNotChat
       </h1>
       <OnlineUsers/>
       </div>
        <div className="user pb-2">
            <UserInfo/>
        </div>
    </div>
</>
  )
}

export default ChatHeader