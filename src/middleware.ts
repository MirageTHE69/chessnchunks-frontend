export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/student-dashboard",
    "/coach-communication",
    "/student-communication",
  ],
};
