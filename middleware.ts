import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";
  const isProtectedPage = pathname.startsWith("/dashboard");

  // Not logged in → protect dashboard
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Logged in → block login/register
  if (token && isAuthPage) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      // Invalid token → clear cookie
      const res = NextResponse.next();
      res.cookies.delete("accessToken");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/login', '/auth/register'],
  };
  