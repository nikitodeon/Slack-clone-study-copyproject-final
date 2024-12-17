import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const isAuthenticated = await isAuthenticatedNextjs();

  if (!isPublicPage(request) && !isAuthenticated) {
    return new Response(null, {
      status: 307,
      headers: { Location: new URL("/auth", request.url).toString() },
    });
  }
  //////////////////////
  if (isPublicPage(request) && isAuthenticated) {
    return new Response(null, {
      status: 307,
      headers: { Location: new URL("/", request.url).toString() },
    });
  }
  ///////////////
});
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
