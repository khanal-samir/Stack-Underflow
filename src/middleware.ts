import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  // create db and storage or get them while rendering the page
  return NextResponse.next(); // move to next middleware or route
}

// See "Matching Paths" below to learn more
export const config = {
  /* match all request paths except for the the ones that starts with:
    - api
    - _next/static
    - _next/image
    - favicon.com
  
    */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // regex chatgpt
};
