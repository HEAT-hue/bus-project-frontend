import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";
import { Bus, NAVIGATION, ROLES, Session } from "./lib/definitions";
import { fetchBus } from "./lib/user/action";

export default async function middleware(req: NextRequest) {
  // Get path
  const path = req.nextUrl.pathname;

  const publicRoutes = [NAVIGATION.LOGIN.toString()];

  /* Define Protected Routes By User Roles */
  const isAdminProtectedRoute = path.startsWith(NAVIGATION.ADMIN);
  const isCaptainProtectedRoute = path.startsWith(NAVIGATION.CAPTAIN);
  const isUserProtectedRoute = path.startsWith(NAVIGATION.USER);

  const adminAllowedRoles = [ROLES.ADMIN, ROLES.EBS, ROLES.SUPER_USER];
  const userAllowedRoles = [ROLES.USER, ROLES.CAPTAIN];

  if (path == "/") {
    return NextResponse.redirect(new URL(NAVIGATION.LOGIN, req.nextUrl));
  }

  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  const cookie = cookies().get("session")?.value!;

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  let session: Session | null = null;

  try {
    session = await decrypt(cookie);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isUserProtectedRoute && (!session || !userAllowedRoles.includes(session?.authorities))) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAdminProtectedRoute && (!session || !adminAllowedRoles.includes(session?.authorities))) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isCaptainProtectedRoute && (!session || session?.authorities != ROLES.CAPTAIN)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isCaptainProtectedRoute && session?.authorities === ROLES.CAPTAIN) {
    try {
      const buses = (await fetchBus(session.token, {})).content;
      const busAssignedToCaptain = buses.find((bus: Bus) => bus.captain?.id == session.id);

      if (!busAssignedToCaptain) {
        return NextResponse.redirect(new URL(NAVIGATION.USER, req.nextUrl));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  // Successful authentication, continue on path
  return NextResponse.next();
}

// Allow images and SVGs
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.gif$).*)",
  ],
};
