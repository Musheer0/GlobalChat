"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdGif } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from '@/components/ui/input';
import { getGif } from '@/lib/gif';
import { Loader, Loader2 } from 'lucide-react';
const GifFinder = ({children,  setGif}:any) => {
    const [results, setResults]= useState([])
    const [isloading, setIsloading]= useState(false)
    const [active, setActive]= useState(null)
  return (
 
    <Drawer>
    <DrawerTrigger>{children}</DrawerTrigger>
    <DrawerContent className='bg-zinc-950 text-gray-50 border-gray-800'>
      <DrawerHeader>
        <DrawerTitle>
          <h1>Search Gifs</h1>
        </DrawerTitle>
        <DrawerDescription>Powered by <Link className='bg-zinc-950/15 rounded-md px-1 text-zinc-500' href={'https://tenor.com'} target='_blank'>tenor</Link></DrawerDescription>
      </DrawerHeader>
     <div className="body px-10 py-5">
      <form onSubmit={async(e)=>{
        setIsloading(true)
        e.preventDefault();
        setResults([])
        let formdata;
        //@ts-ignore
        formdata = new FormData(e.target);
        //@ts-ignore
       const {query} = Object.fromEntries(formdata);
       await getGif(query as string).then((res)=>{
        setResults(res)
      setIsloading(false)
      })
      }} className='flex items-center gap-1'>
      <Input name='query' className='bg-zinc-950 border-zinc-800'/>
         <Button className='border-zinc-800 bg-zinc-900 border-[2px]'>
         <FiSearch />
  
         </Button>
      </form>
  
      <div className="result pt-5">
        <h2 >Results</h2>
        {(results.length===0 && !isloading) && <><p className='w-full text-center text-xs text-zinc-400'>Search your favorite gif</p></>}
        {isloading &&
        <div className="loader w-full text-center flex items-center justify-center h-full">
        <Loader2 className='animate-spin'/>
    </div>
        }
        <div className="flex gap-2 flex-wrap h-[60vh] overflow-auto  justify-center">
               {
               //@ts-ignore
               results?.results?.map((e,i)=>{
                return  <DrawerClose key={i}>
                    <div className={`${active===i && 'opacity-60'} relative overflow-hidden`}>
                    {active===i && <p className='text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Selected</p>}
                    <img loading='lazy' onClick={()=>{
                    setGif(e?.media_formats.gif.url) 
                    setActive(i)
                }} className='w-[100px] h-fit  rounded-md' src={e?.media_formats.gif.url} alt={e?.content_description} />
                </div>
                </DrawerClose>
               })}
        </div>
      </div>
     </div>
    </DrawerContent>
  </Drawer>
  
  )
}

export default GifFinder