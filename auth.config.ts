import type { NextAuthConfig, User } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    // redirect() {
    //   const callbackUrl =  process.env.NEXTAUTH_URL || 'https://nextjs-dashboard-wmb0412.vercel.app';
    //   return `${callbackUrl}/dashboard`;
    // },
  },
  providers: [],
} as NextAuthConfig;
