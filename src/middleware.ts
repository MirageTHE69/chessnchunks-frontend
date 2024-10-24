// /* eslint-disable @typescript-eslint/no-unused-expressions */
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.user?.role;

    const pathname = req.nextUrl.pathname;

    // console.log(role)

    if (role === "STUDENT" && pathname === "/assign-puzzle-coach") {
      return Response.redirect(new URL("/", req.url));
    }
    if (role === "STUDENT" && pathname === "/assign-quiz-coach") {
      return Response.redirect(new URL("/", req.url));
    }
    if (role === "STUDENT" && pathname === "/play-with-batch") {
      return Response.redirect(new URL("/", req.url));
    }
    if (role === "STUDENT" && pathname === "/coach-dashboard") {
      return Response.redirect(new URL("/student-dashboard", req.url));
    }
    if (role === "STUDENT" && pathname === "/coach-communication") {
      return Response.redirect(new URL("/student-communication", req.url));
    }

    if (role === "COACH" && pathname === "/student-dashboard") {
      return Response.redirect(new URL("/coach-dashboard", req.url));
    }
    if (role === "COACH" && pathname === "/student-communication") {
      return Response.redirect(new URL("/coach-communication", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

// Specify the routes that the middleware should apply to
export const config = {
  matcher: [
    "/student-dashboard",
    "/coach-dashboard",
    "/student-communication",
    "/coach-communication",
    "/assign-puzzle-coach",
    "/play-with-batch",
    "/assign-quiz-coach",
    "/profile-settings",
  ],
};
