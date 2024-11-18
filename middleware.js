export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/meals/add', '/profile', '/properties/saved', '/messages'],
};
