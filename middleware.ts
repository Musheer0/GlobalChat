import { NextRequest, NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
 const session = !!req.auth;
 const {nextUrl} = req
 //logic for non-users
 if(!session){
   if(nextUrl.pathname==='/'){
    return NextResponse.redirect(new URL('/sign-in',nextUrl))

   }
 } 
 //login for user
 if(session){
    if(nextUrl.pathname==='/sign-in'){
        return NextResponse.redirect(new URL('/', req.nextUrl))

    }
 }
})