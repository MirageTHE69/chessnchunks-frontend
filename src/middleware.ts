import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/login", "/signup"];
const privatePaths = ["/student-dashboard", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (privatePaths.some((path) => pathname.startsWith(path)) && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (publicPaths.some((path) => pathname.startsWith(path)) && token) {
    url.pathname = "/student-dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student-dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};
