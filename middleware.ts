import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/admin']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtected = protectedRoutes.some((r) => path.startsWith(r))
  const isPublic = publicRoutes.includes(path)

  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value
  const session = await decrypt(sessionCookie)

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublic && session) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
