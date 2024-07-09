import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./db"
 
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks:{
    session : async({session, token})=>{
      //@ts-ignore
      session.user.id = token.sub;
      return session
    }
  },
  pages:{
    error: '/',
    signIn: '/sign-in'
  }
})