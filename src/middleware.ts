import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  defaultLocale: "vi",
  localeDetection: false
});

export const config = {
  matcher: ["/", "/(vi|en)/:path*"], 
};
