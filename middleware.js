import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  const protectedRoutes = [
    '/meals/add',
    '/profile',
    '/meals/saved',
    '/messages',
  ];

  if (protectedRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/meals/add', '/profile', '/meals/saved', '/messages'],
};
