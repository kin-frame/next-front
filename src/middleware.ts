import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

import { accessRules, JwtPayload } from "./shared/config/roles";
import parseJwt from "./shared/util/parseJwt";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  if (!accessToken) {
    return withoutTokenMiddleware(request);
  } else {
    return withTokenMiddleware(request, accessToken.value);
  }
}

function withoutTokenMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/auth/callback")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}

function withTokenMiddleware(request: NextRequest, accessToken: string) {
  const pathname = request.nextUrl.pathname;
  const { status, role } = parseJwt<JwtPayload>(accessToken);

  if (pathname.startsWith("/login") || pathname === "/") {
    if (status === "APPROVED") {
      return NextResponse.redirect(new URL("/home", request.url));
    } else if (status === "SUBMIT") {
      return NextResponse.redirect(new URL("/signup/info", request.url));
    } else {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  } else {
    return withRoleMiddleware(request, role);
  }
}

function withRoleMiddleware(request: NextRequest, role: JwtPayload["role"]) {
  const pathname = request.nextUrl.pathname;

  for (const rule of accessRules) {
    if (pathname.startsWith(rule.pathPrefix)) {
      if (!rule.allowed.includes(role) && rule.redirect) {
        return NextResponse.redirect(new URL(rule.redirect, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon).*)",
  ],
};
