import createMiddleware from "next-intl/middleware";
import { locales } from "@/navigation";

export default createMiddleware({
  locales,
  defaultLocale: "ua",
});

export const config = {
  matcher: ["/", "/(ua|en)/:path*"],
};
