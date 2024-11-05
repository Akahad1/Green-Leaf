import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentUser } from "./Services/AuthService";

export async function middleware(request: NextRequest) {
  const AuthRouter = ["/login", "/singup"];
  const AdminRoute = ["/aboutUs", "/profile", "/imageGallery", "/"];
  const userRoute = ["/aboutUs", "/profile", "/imageGallery", "/"];
  const { pathname } = request.nextUrl;
  console.log(pathname);

  const user = await currentUser();

  if (!user) {
    if (AuthRouter.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (AdminRoute.includes(pathname) && user?.role === "admin") {
    return NextResponse.next();
  }
  if (userRoute.includes(pathname) && user?.role === "user") {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/singup", "/aboutUs", "/profile", "/imageGallery", "/"],
};
