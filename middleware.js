export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/meals/add', '/profile', '/meals/saved', '/messages'],
};
