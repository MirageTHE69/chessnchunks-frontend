import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);
        token?.role === "admin";
        return true;
      },
    },
  }
);

export const config = { matcher: ["/student-dashboard", "/coach-dashboard"] };
