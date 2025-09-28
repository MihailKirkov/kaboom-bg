import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matches all paths except /api, /trpc, /_next, /_vercel, and files with dots
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
