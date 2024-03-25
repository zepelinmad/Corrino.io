// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

// Configure your Middleware
export default authMiddleware({
  // Define any public or ignored routes if necessary
  publicRoutes: ["/api/create-pets-table"]
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)"
  ]
};
