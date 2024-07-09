"use server"
import { signIn } from "@/auth"
import { db } from "@/db"
import { User } from "@prisma/client"
import { uploadfile } from "./media"
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
export const sendMessage = async(userId:string, msg:string, media:any[])=>{
 if(userId && msg){
   try{
  let mediaarray;
  console.log(media)
  if(media?.length>0){
    mediaarray =await Promise.all(
      media.map(async(e,i)=>{
        //@ts-ignore
        const filebuffer =  await uploadfile(e?.name, e?.size, e?.file,e?.type)
        return filebuffer
      })
    )
  }
   const newmessage =await  db.message.create({data:{
    msg: msg,
    userId :userId,
    media: mediaarray
 }, include:{user: true},})
 const filteredmessage = {
  msg: newmessage?.msg,
  id: newmessage.id,
  created:newmessage.created,
  updated:newmessage.updated,
  user:newmessage.user,
  userId:newmessage.userId,
  media :newmessage.media.length
 }
pusher.trigger('message', 'send-msg-event',{
  message: `${ JSON.stringify(filteredmessage)}\n\n`
})
 return newmessage;
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
