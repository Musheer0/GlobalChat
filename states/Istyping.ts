import { create } from 'zustand';
import { User } from '@prisma/client';

interface MsgState {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
}

export const useIstypingStore = create<MsgState>((set) => ({
  users: [],
  addUser: (user: User) =>
    set((state) => ({
      users: state.users.some((u) => u.id === user.id) ? state.users : [...state.users, user],
    })),
  removeUser: (user: User) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== user.id),
    })),
}));
