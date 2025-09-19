import { NextRequest, NextResponse } from "next/server"
import { accessRules } from "./lib/access-rules"
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
