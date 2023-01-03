import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    console.log("middleware - token", token)
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard", "/editor/:path*", "/login", "/register"],
  //matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
}

/*import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log("middleware - withAuth", token, req.nextauth.token);
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin"
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})

export const config = { matcher: ["/admin", "/me"] }
*/

/*import { NextResponse } from "next/server"
import { unstable_getServerSession as getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function middleware(req, res){
  const session = await getServerSession(req, res, authOptions)
  console.log("middleware - Current User Session:", session)
    const isAuthenticated = (session != null) ? true : false
    //let isAuthenticated = req.cookies.get("loggedin");
    const url = req.url
    
    if(!isAuthenticated && url.includes('/dashboard')){
        return NextResponse.redirect("http://localhost:3000/");
    }

    if (isAuthenticated && url === "http://localhost:3000/") {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    }
}
*/