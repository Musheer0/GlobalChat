// import { Media } from "@prisma/client";
export const ReadFileAsBytes  = async(file:File)=>{
    //create a promise
    return new Promise((resolve,reject)=>{
      //create filereader api from js
      const reader = new FileReader();
      // load & read
    reader.onload = ()=>{
      // the the array buffer
      const arrayBuffer = reader.result;
      // conver to unit8array 
      //@ts-ignore        
      const byes = new Uint8Array(arrayBuffer);
     // return the bytes
      resolve(byes)
    };
    //error handeling
    reader.onerror = (e)=>{
      reject(e)
    };
    //start reading here
      reader.readAsArrayBuffer(file)
    });
  };

//  const uploadfile = async(file)=>{
//       // read file as byes
//   //@ts-ignore        
//  const byes = await ReadFileAsBytes(file);
//  // upload the file to postgress sql servel (neondb) with more info for future use
//  // note: make sure to buffer the array in server side 
//  //@ts-ignore         setFile(e.target.files[0])
//  await uploadfile(file?.name, file?.size, byes, file?.type).then((res:Media)=>{
//   console.log(res);
//   //convert buffer to base64
//   const base64File = Buffer.from(res?.data).toString('base64');
// //   const fileurl = res?.baseUri+ base64File;
//    return {base64: base64File, type: res?.type, baseuri: res?.baseUri} //optional add response
//  })
// }