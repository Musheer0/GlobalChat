"use client"
import React from 'react'
import { useIstypingStore } from '../../states/Istyping'

const Istyping = () => {
    const {users} = useIstypingStore()
  return (
    <div className="istyping  text-zinc-600 text-xs text-start w-full my-0 leading-none">
 {users[0]?.name!== undefined && 
 <>
    {(users.length>1) ? `${users.length} users are typing`: `${users[0]?.name} is typing`}
 </>
 }
  </div>
  )
}

export default Istyping