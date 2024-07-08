import { auth } from '@/auth'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import SignOutComponent  from './SignOut'
import { redirect } from 'next/navigation'
import InitUser from '@/states/InitUser'
const UserInfo = async() => {
    const user = await auth()
  return (
<div>
<InitUser user={user}/>
<div className='flex items-center gap-2'>

        {user?.user ?
        <>
        <p className='text-sm text-zinc-600'>{user.user.name}</p>
<DropdownMenu>
<DropdownMenuContent  className='bg-gray-900 border-[1px] text-white border-gray-800 '>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator  className='bg-gray-700'/>
   <SignOutComponent className=''>
   <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'>Logout</DropdownMenuItem>
   </SignOutComponent>
  </DropdownMenuContent>
     <DropdownMenuTrigger>
     <img src={user?.user?.image|| "" } className='w-[30px] h-[30px] rounded-full object-cover' alt='profile'/>
     </DropdownMenuTrigger>
     </DropdownMenu>
        </>:
        <>
        {redirect('/sign-in')}
        </>
        }
    </div>
</div>
  )
}

export default UserInfo