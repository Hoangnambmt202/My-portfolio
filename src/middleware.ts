import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'vi'];
const defaultLocale = 'en';

function hasLocale(pathname: string): boolean {
	return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl;

	// Skip for public files and Next.js internals
	if (
		pathname.startsWith('/api') ||
		pathname.startsWith('/_next') ||
		/\.(.*)$/.test(pathname)
	) {
		return NextResponse.next();
	}

	// Already localized
	if (hasLocale(pathname)) {
		return NextResponse.next();
	}

	// Redirect to default locale
	const localizedUrl = new URL(`/${defaultLocale}${pathname}${search}`, request.url);
	return NextResponse.redirect(localizedUrl);
}

export const config = {
	matcher: ['/((?!_next|.*\..*).*)'],
}; 