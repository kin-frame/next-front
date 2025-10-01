import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const pathname = request.nextUrl.pathname;

  if (!accessToken && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/", "/home"],
};
