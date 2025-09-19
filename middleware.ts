// import { NextResponse, NextRequest } from 'next/server'
// import { auth } from './lib/auth'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const session = await auth()
  
//   if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    
//     if (session) {
//       console.log("Authenticated...");
//       const authUrl = new URL('/dashboard', request.url)
//       authUrl.searchParams.set('callbackUrl', pathname)
//       return NextResponse.redirect(authUrl)
//     }
//   }

  

//   // Middleware ini hanya berlaku di /dashboard
//   if (pathname.startsWith("/dashboard")) {
//     if (!session) {
//       console.log("Not authenticated");
//       const loginUrl = new URL('/sign-in', request.url)
//       loginUrl.searchParams.set('callbackUrl', pathname)
//       return NextResponse.redirect(loginUrl)
//     }

//     // contoh kalau mau block akses ke /post untuk non-admin
//     if (pathname.startsWith("/dashboard/post") && session?.user.role !== "admin") {
//       console.log("Not Allowed");
      
//       return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/sign-in', '/sign-up','/dashboard/:path*'],
//   runtime: "nodejs", 
// }


import { NextRequest, NextResponse } from "next/server"
import { accessRules } from "./lib/db/access-rules"
import { auth } from "./lib/auth"
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()

  // 🔒 jika belum login
  if (pathname.startsWith("/dashboard") && !session) {
    const loginUrl = new URL("/sign-in", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 🎯 otorisasi role
  if (pathname.startsWith("/dashboard") && session) {
    const allowedRoles = accessRules[pathname]

    if (allowedRoles && !allowedRoles.includes(session.user.role)) {
      console.log(`⛔ Access denied to ${pathname} for role ${session.user.role}`)
      return NextResponse.redirect(new URL("/403", request.url)) // bikin page 403
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
    runtime: "nodejs", 
}
