import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  apiRoutes: ["/(api|trpc)(.*)"], // Per `matcher` - `publicRoutes` override this
  publicRoutes: ["/sign-in", "/sign-up"],
  afterAuth(auth, req, evt) {
    console.log("MIDDLEWARE HIT", auth);
    // Allow matched api/public requests
    if (auth.isApiRoute || auth.isPublicRoute) {
      return NextResponse.next();
    }
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Ex. // redirect them to organization selection page
    // if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/org-selection"){
    //   const orgSelection = new URL('/org-selection', req.url)
    //   return NextResponse.redirect(orgSelection)
    // }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
