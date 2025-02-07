import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

const publicRoutes = [
  {
    path: "/sign-in",
    whenAuthenticated: "redirect",
  },
  {
    path: "/register",
    whenAuthenticated: "redirect",
  },
  {
    path: "/",
    whenAuthenticated: "next",
  },
  {
    path: "/feed",
    whenAuthenticated: "next",
  },
  {
    path: "/project/:id",
    whenAuthenticated: "next",
  },
  {
    path: "/profile/:id",
    whenAuthenticated: "next",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/app";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  // If no token and trying to access a protected route (not in publicRoutes)
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // If token exists and trying to access public routes with "redirect" behavior
  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // exposed cookie in headers
  if (authToken) {
    const response = NextResponse.next();
    response.headers.set("x-auth-token", authToken.value);
    return response;
  }

  // Default case: proceed with the request
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
