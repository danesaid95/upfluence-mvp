import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // For now, just allow all requests to pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/influencer/:path*", 
    "/admin/:path*"
  ]
}