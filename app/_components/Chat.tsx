"use client"
import React, { use, useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { DeleteMessage, UpateMessage } from '@/lib/action'
import { RiLoader4Line } from "react-icons/ri";
import { useUserStore } from '@/states/user'
import { toast } from 'sonner'
import Pusher from 'pusher-js'
import { useChatStore } from '@/states/message'

const Chat = ({ e, i }:any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isedited, setisEdited] =useState(false)
  const [msg, setMsg] = useState(e)
  const {user} = useUserStore()
  const {deletedmsg} = useChatStore()
const [Iseditng, setIsEditng]= useState(false)
  const handleDialogOpenChange = (open:boolean) => {
    setIsDialogOpen(open);
  };

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    setIsEditng(true)
    e.preventDefault();
    setIsDialogOpen(false); // Close the dialog
    let formData:any = new FormData(e.currentTarget);
    formData = Object.fromEntries(formData) as {id:string, msg: string}
    //@ts-ignore
    await UpateMessage(formData?.id, formData?.msg, i).then((res)=>{
      if(!res?.success)   toast("error editing message try again",{position: "top-left"});
    })
    //@ts-ignore
    setIsEditng(false)
  };
  return (
   <>
 {!deletedmsg.includes(msg?.id) &&
  <div className='chat-msg flex relative items-start gap-2 w-full min-w-[300px] justify-between rounded-md p-1'>
 {Iseditng && 
    <div className="loader absolute w-full h-full bg-gray-950/80 top-0 left-0 flex items-center justify-center ">
    <span className='animate-spin'>
    <RiLoader4Line />
    </span>
  </div>
 }
    <div className="chat flex  items-start gap-2">
    <img 
         src={msg?.user?.image} 
         className='small w-[40px] h-[40px] object-cover rounded-full' 
         alt="sender profile" 
       />
       <div className="text flex flex-col gap-1">
         <p className='username text-xs text-zinc-200'>{msg?.user?.name}</p>
 
         <p className='time'>
         {new Date(msg?.  updated).getTime() === new Date(msg.created).getTime()
          ? new Date(msg.created).toDateString() : `(edited) ${new Date(msg.updated).toDateString()}`}
          </p>
         <p className='msg whitespace-pre-wrap'>{msg?.msg}</p>
       </div>
    </div>
    {/*@ts-ignore*/}
       {(user.user?.id === msg?.userId &&  !deletedmsg.includes(msg?.id))&&
        <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDotsVertical/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-gray-900 border-[1px] text-white border-gray-800'>
          <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer' onClick={() => setIsDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer' onClick={async()=>{
            setIsEditng(true);
           await DeleteMessage(msg?.id).then((res)=>{
             if(res?.success){
               setIsEditng(false);
             }
             else{
                       //@ts-ignore
         toast("error deleting message try again",{position: "top-left"});
             }
           })
          }}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
 
       }
       <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
         <DialogContent className='bg-gray-950 border-gray-900 text-zinc-50'>
           <DialogHeader>
             <DialogTitle>Edit Message</DialogTitle>
             <DialogDescription>
               Make changes to your Message here. Click save when you&apos;re done.
             </DialogDescription>
           </DialogHeader>
           <form onSubmit={handleSubmit} className="grid gap-4 py-4">
             <div className="flex flex-wrap items-center gap-4">
               <Label htmlFor="msg" className="text-right">
                 Message
               </Label>
               <Input
                 id="msg"
                 name='msg'
                 defaultValue={msg?.msg}
                 className="col-span-3 bg-gray-900 border-gray-800 text-white"
               />
               <input type="text" name="id" value={msg?.id} hidden />
             </div>
             <div className="w-full">
               <DialogFooter>
                 <Button type="submit">Save changes</Button>
               </DialogFooter>
             </div>
           </form>
         </DialogContent>
       </Dialog>
     </div>
 }
    
   </>
  )
}

export default Chat
