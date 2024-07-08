import { create } from 'zustand'
import { Message } from '@prisma/client'

interface MsgState {
  messages:  Message[];
  addMessage: (message: Message) => void;
  removeMessage : (id:string) => void;
  deletedmsg: String[],
  addDeletedMsg: (id:string)=> void;
}

export const useChatStore = create<MsgState>()((set) => ({
  messages: [ ],
  addMessage: (message:Message) => set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (id:string)=>set((state)=>({messages:state.messages.filter((e)=> e.id !==id)})),
  deletedmsg: [],
addDeletedMsg: (id:string)=>set((state)=>({deletedmsg: [...state.deletedmsg, id]}))
}))