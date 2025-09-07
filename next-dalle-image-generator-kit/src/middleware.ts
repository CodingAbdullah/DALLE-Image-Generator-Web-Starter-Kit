import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Public routes separated from the protected routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

// Middleware function for the project, for protecting routes
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// Middleware configuration object for the project
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
};