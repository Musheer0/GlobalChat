"use client"
import React, { useEffect, useRef } from 'react';
import { useUserStore } from '../../states/user';
import { useChatStore } from '@/states/message';
import InitChat from '@/states/InitChat';
import LoaderChat from './LoaderChat';
import { BsThreeDotsVertical } from 'react-icons/bs'
import Chat from './Chat';

const ChatMessage = () => {
  const { user } = useUserStore();
  const { messages } = useChatStore();
  const msgendref = useRef(null)
  const handlescrolltoend = ()=>{
    msgendref.current?.scrollIntoView({behavior: 'smooth'});
  }
  useEffect(()=>{
    handlescrolltoend()
  },[messages])
  return (
    <div className='chatbox w-full flex-1 flex  relative flex-col gap-2 overflow-auto border-none'>
      <InitChat />
 
       {messages.map((e, i) => {
        return (  <Chat e={e} key={i} i={i}/>
        );
      })} 

      {/* {messages.length===0 && <>
      {[1,2,3,4,5,6,7,8,9,0].map((e)=>{
        return <LoaderChat key={e}/>
      })}
      </>} */}
      <div className="endline h-10 " ref={msgendref}>
        {messages.length}
      </div>
    </div>
  );
};

export default ChatMessage;
