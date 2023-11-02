import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "../i18n.config";

const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  const locale = match(languages, locales, defaultLocale);
  return locale;
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const pathnameHasLocale = locales.some(
  //   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  // );

  // if (pathnameHasLocale) return;

  // // Redirect if there is no locale
  // const locale = getLocale(request);
  // request.nextUrl.pathname = `/${locale}${pathname}`;
  // // e.g. incoming request is /products
  // // The new URL is now /en/products
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
