import { create } from 'zustand'

interface OnlineUsers {
    users : string[],
    setOnlineUsers : (id:string)=> void
}

export const useOnlineUserStore = create<OnlineUsers>()((set)=>({
 users: [],
 setOnlineUsers: (id)=>set((state)=>({users: [...state.users, id]}))
}))