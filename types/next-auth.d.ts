import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isVerified: boolean;
      role?: string;
    };
  }

  interface User {
    id: string;
    isVerified?: boolean;
    role?: string;
  }
}
