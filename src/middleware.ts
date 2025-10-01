import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

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

  if (!pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}

function withTokenMiddleware(request: NextRequest, accessToken: string) {
  const pathname = request.nextUrl.pathname;
  const { status, role } = parseJwt<JwtPayload>(accessToken);

  if (pathname.startsWith("/login")) {
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

  if (pathname.startsWith("/admin")) {
    if (role === "ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else {
    return NextResponse.next();
  }
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

type JwtPayload = {
  id: number;
  email: string;
  /**
   * user.entity.ts 참고
   */
  status: "PENDING" | "SUBMIT" | "APPROVED" | "REJECTED";
  role: "ADMIN" | "USER" | "GUEST";
  iat: number;
  exp: number;
};
