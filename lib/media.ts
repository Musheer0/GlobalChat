"use server";
export const uploadfile = async(name:string, size:number, file:Uint8Array, type:string)=>{
    // create file buffer from unit8array 
  const base64String = Buffer.from(file).toString('base64');
  
  //store it with extrameta data
    const media =  {
        name:name,
        size:size,
        type: type,
        baseUri: `data:${type};base64,${base64String}`  //add base64string at end from client side
    }
    return media
}