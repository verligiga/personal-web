import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import authConfig from "@/lib/auth.config";
import { routing } from "@/i18n/routing";

const { auth } = NextAuth(authConfig);
const handleI18nRouting = createIntlMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLoggedIn = !!req.auth;
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
      }
      return NextResponse.next();
    }

    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", req.nextUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: ["/admin/:path*", "/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
