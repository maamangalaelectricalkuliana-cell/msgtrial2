'use client';

import { useSession, signOut } from 'next-auth/react';
import { getInitials } from '@/lib/utils';
import { LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold overflow-hidden">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || ''}
            fill
            className="object-cover"
          />
        ) : (
          getInitials(session.user.name || 'User')
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <h3 className="truncate font-semibold text-gray-900 dark:text-white">
          {session.user.name}
        </h3>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {session.user.email}
        </p>
      </div>
      <div className="flex gap-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => signOut({ callbackUrl: '/' })}
          className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
