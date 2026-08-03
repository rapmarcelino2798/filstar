import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // (Optional: Keep Supabase client if you use it for other public parts of your app)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'

  // Check for your static admin session cookie instead of Supabase user
  const adminSession = request.cookies.get('admin_session')?.value

  // 1. If trying to access any admin route (except login) without the admin session cookie
  if (pathname.startsWith('/admin') && !isLoginPage && !adminSession) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 2. If already authenticated and trying to visit the login page, send them to the admin dashboard
  if (isLoginPage && adminSession) {
    const adminUrl = new URL('/admin', request.url)
    return NextResponse.redirect(adminUrl)
  }

  return response
}

export const config = {
  matcher: [
    // Match all request paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}