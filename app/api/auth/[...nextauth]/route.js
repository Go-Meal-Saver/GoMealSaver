<<<<<<< Updated upstream
import NextAuth from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
=======
import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
>>>>>>> Stashed changes
