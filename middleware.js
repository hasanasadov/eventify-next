import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const p = req.nextUrl.pathname;

      if (p.startsWith("/dashboard")) return !!token;
      if (p.startsWith("/profile")) return !!token;

      //   if (p.startsWith("/admin"))
      //     return token?.role === "ADMIN" || token?.role === "SUPERADMIN";
      //   if (p.startsWith("/super")) return token?.role === "SUPERADMIN";

      return true; // qalan hər yer açıqdır
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
