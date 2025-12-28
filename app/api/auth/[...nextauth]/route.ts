import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { adminDb } from '@/lib/firebaseAdmin';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && adminDb) {
        try {
          const userRef = adminDb.collection('users').doc(user.id);
          const userDoc = await userRef.get();
          
          if (!userDoc.exists) {
            await userRef.set({
              id: user.id,
              email: user.email,
              fullName: user.name || '',
              avatar: user.image || '',
              googleId: account.providerAccountId,
              isVerified: false,
              status: 'online',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              lastSeen: new Date().toISOString(),
              preferences: {
                theme: 'system',
                notifications: true,
                sound: true,
                emailNotifications: true,
                lastSeenVisibility: true,
                onlineStatusVisible: true,
                readReceipts: true,
              },
              settings: {
                fontSize: 'medium',
                displayMode: 'comfortable',
                accentColor: '#2563EB',
              },
            });
          } else {
            await userRef.update({
              lastSeen: new Date().toISOString(),
              status: 'online',
            });
          }
          
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        
        if (adminDb) {
          try {
            const userDoc = await adminDb.collection('users').doc(token.sub!).get();
            if (userDoc.exists) {
              const userData = userDoc.data();
              session.user.isVerified = userData?.isVerified || false;
              session.user.role = userData?.role;
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
