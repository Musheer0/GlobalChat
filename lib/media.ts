"use server";

import { db } from "@/db";

export const uploadfile = async(name:string, size:number, file:Uint8Array, type:string)=>{
    // create file buffer from unit8array 
  const filebuffer = Buffer.from(file)
  //store it with extrameta data
    const media = await db.media.create({
        data:{
            name:name,
            size:size,
            data: filebuffer,
            type: type,
            baseUri: `data:${type};base64,`  //add base64string at end from client side
        }
    })
    return media
}