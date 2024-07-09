"use server"
import { signIn } from "@/auth"
import { db } from "@/db"
import { User } from "@prisma/client"
import { uploadfile } from "./media"
import { use } from "react"
const Pusher = require("pusher")
const pusher = new Pusher({
  appId : process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret : process.env.PUSHER_SECRET,
  cluster : process.env.PUSHER_CLUSTER,
  useTLS : true
});
export const loginwithgithub = async()=>{
    await signIn("github")
}
export const loginwithgoogle= async()=>{
    await signIn("google")
}
export const sendMessage = async(userId:string, msg:string, gif:string)=>{
 if(userId && (msg || gif)){
    try{
      const newmessage =await  db.message.create({data:{
        msg: msg || '',
        userId :userId,
        gif: gif|| ''
     }, include:{user: true},})
    
    pusher.trigger('message', 'send-msg-event',{
      message: `${ JSON.stringify(newmessage)}\n\n`
    })
     return newmessage;
       }
       catch(e){
        console.log(e)
        //@ts-ignore
        return {error: true, cause:e.message}
       }
    }
   
 }

export const DeleteMessage = async(Id:string)=>{
 if(Id){
  console.log(Id)
   try{
   await db.message.delete({where: {id:Id}})
    pusher.trigger("editmessage","delete-msg", {
      id: Id
    })  
   return {success: true};
   }
   catch(e){
    console.log(e)
    //@ts-ignore
    return {error: true, cause:e.message}
   }
 }
 else{
    return;
 }

}
export const UpateMessage = async(Id:string, msg:string,index:number)=>{
  console.log('start')
  if(Id){
    const time = new Date()
    try{
    const message = await db.message.update({where:{id: Id}, data:{
      //@ts-ignore
      updated: time.toISOString(),
      msg: msg
       
    }, include:{user: true}})
    pusher.trigger("editmessage", "edit-msg",{
      msg: message,
      index: index
    })

      return {success: true, message}
    }
    catch(e){
     console.log(e)
     //@ts-ignore
     return {error: true, cause:e.message}
    }
  }
  else{
     return{msg: msg||'Missing', id: Id || 'missing'}
  }
}

export const getChats = async()=>{
  const chats = await db.message.findMany({include:{user: true}, orderBy:{created: 'asc'}, take:50});
  return chats
}

export const istyping = async(user:User|null, method:boolean)=>{
       pusher.trigger("message", "istyping",{
        user : JSON.stringify(user),
        method: method
       })
}
export const isonline = async(userId:string)=>{
pusher.trigger("message", "isonline",{
  user : userId,
})
}
export const getUser = async(id:string)=>{
  try{
    if(id){
      const user = await db.user.findFirst({where:{id:id}});
      if(user){
       return user;
      }
      else return
     }
     else return
  }
  catch{
    return;
  }
}