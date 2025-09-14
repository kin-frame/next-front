import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config: MiddlewareConfig = {
  matcher: [
    {
      source: "/",
      // has: [
      //   { type: 'header', key: 'Authorization', value: 'Bearer Token' },
      //   { type: 'query', key: 'userId', value: '123' },
      // ],
      missing: [{ type: "cookie", key: "session", value: "active" }],
    },
  ],
};
