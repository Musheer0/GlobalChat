"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/states/user";
import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { isonline, istyping, sendMessage } from "@/lib/action";
import { toast } from "sonner";
import { useChatStore } from "@/states/message";
import { useIstypingStore } from "@/states/Istyping";
import Pusher from "pusher-js";
import { useOnlineUserStore } from "@/states/OnlineUsers";
import { Message } from "@prisma/client";
import Istyping from "./Istyping";
import { MdGif, MdPermMedia } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ReadFileAsBytes } from "@/lib/clientfunctions";
import GifFinder from "@/components/GifFinder";
 
const closebtn= ({fun}:any)=>{
  return (
    <div className="close bg-zinc-950/50 cursor-pointer p-1 absolute top-1 right-1 rounded-md"><IoCloseCircleOutline /></div>
  )
}
 
const SendMessage = () => {
  const { user } = useUserStore();
  const inputref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState("")
  const {messages,addMessage,addDeletedMsg, updateMessage, updatedMessages} = useChatStore();
  const {addUser, removeUser, users} = useIstypingStore()
const {setOnlineUsers, users:onlineusers} = useOnlineUserStore()

function removefile (index:number){
//@ts-ignore
   setFIles(files.filter((e,i)=> i!==index))  
}
useEffect(()=>{
  var pusher= new  Pusher("3cb568a6f522ded75bb1",{
    cluster: "mt1"
  });
  //event funtions
  const handleNewMessage = (data:any) => {
    addMessage(JSON.parse(data?.message))
  };
  const handleIstyping = (data:any)=>{
    const istypinguser = JSON.parse(data?.user);
    if(data?.method){
      addUser(istypinguser);
    }
    else{
      removeUser(istypinguser);
    }
  }
    const handleIsonline = (data: any) => {
      setOnlineUsers(data.user);
    };
    const handledelete = (data:any)=>{
      addDeletedMsg(data?.id)
  
    }
    const handleEdited = async(data:any)=>{
      const doesExist = updatedMessages.findIndex((e)=> e.id===data?.msg?.id);
      if(doesExist===-1){
            updateMessage([...updatedMessages, data?.msg])
      }
      else{
        var newMessageArray = updatedMessages;
        newMessageArray[doesExist] = data?.msg;
        updateMessage(newMessageArray)
      }
  
    }
    //channels
  const channel = pusher.subscribe('message');
  var editchannel = pusher.subscribe("editmessage");
  const unsub = async()=>{
   //@ts-ignore
    if(user?.user){
    //@ts-ignore
      await isonline(user?.user?.id)     
     channel.bind('isonline', handleIsonline);
   }
   //bind channels
    channel.bind('send-msg-event', handleNewMessage);
    channel.bind('istyping', handleIstyping);
    editchannel.bind("delete-msg",handledelete);
    editchannel.bind("edit-msg", handleEdited);
  }
  unsub();
    return ()=>{
      //clean-up 
      //unbind, unsubscribe
      channel.unbind("send-msg-event", handleNewMessage);
      channel.unbind("istyping",handleIstyping);
      channel.unbind("isonline", handleIsonline);
      editchannel.unbind("delete-msg",handledelete);
      editchannel.unbind("edit-msg",handledelete);
      pusher.unsubscribe("message");
      pusher.unsubscribe("editmessage");

    }
},[user])
  return (
<div className="w-full flex items-end gap-1">
<form
      onSubmit={async (e) => {
        setLoading(true);
        e.preventDefault();
        let formdata;
        //@ts-ignore
        formdata = new FormData(e.target);
        formdata = Object.fromEntries(formdata);
                //@ts-ignore
           await istyping(user?.user, false)
        //@ts-ignore
        if(user?.user?.id){
                  //@ts-ignore
          await sendMessage(user?.user?.id, formdata?.msg, gif).then((res)=>{
            //@ts-ignore
            if(res?.error){
              toast("error sending message try again",{position: "top-left"});
              setLoading(false);

            }
            setLoading(false);
           setGif("")
          })
        }
        //@ts-ignore
        inputref.current.value = "";
      }}
      className="flex flex-col w-full relative h-full"
    >
     <div className="top-overlays flex items-end gap-1 justify-start">
     <Istyping/>
     <div className="gifs">
     {gif!==""&& 
      <img className=" w-1/2 bg-red-500 rounded-md object-cover my-1" src={gif} alt="gif preview" />
     }
     </div>
     </div>
        <div className="inputs relative flex items-start h-full w-full  gap-2 ">

        <input
        disabled={loading}
        ref={inputref}
        placeholder="Enter message"
        className="bg-gray-900 focus:outline-0 flex-1 resize-none  rounded-md  border-[1px] py-3 px-1 focus:border-gray-700 border-gray-800"
        name="msg"
        onFocus={async()=>{
          //@ts-ignore
          await istyping(user?.user, true)
        }}
        onBlur={async()=>{
          //@ts-ignore
                    await istyping(user?.user, false)

        }}
      ></input>
          
      <Button
        disabled={loading}
        className="h-full w-[60px] text-xl"
        type="submit"
      >
       {loading ?<span className="animate-spin"> <AiOutlineLoading3Quarters/></span> :  <IoIosSend />}
      </Button>
     

        </div>
    </form>
    <GifFinder setGif={setGif}>
      <Button type="button" suppressHydrationWarning className='h-[53px] w-[60px] text-xl'>
         <MdGif />
         </Button>
      </GifFinder>
</div>
  );
};

export default SendMessage;
