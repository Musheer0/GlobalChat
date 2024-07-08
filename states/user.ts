import { create } from 'zustand'
import { User } from 'next-auth'

interface UserState {
  user: null | User
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
}))