'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, MessageSquare, Search, Plus, Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import ConversationList from '@/components/ConversationList';
import ChatWindow from '@/components/ChatWindow';
import UserProfile from '@/components/UserProfile';
import ThemeToggle from '@/components/ThemeToggle';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { activeConversation } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && !session?.user?.isVerified) {
      router.push('/auth/verify');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900"
    >
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Header - Mobile */}
      <div className="fixed top-0 z-30 flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <h1 className="text-xl font-bold">MME msg</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bell className="h-5 w-5" />
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
            />
          </motion.button>
        </div>
      </div>

      {/* Sidebar - Conversations */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -100 }}
        className={`fixed z-50 h-full w-80 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:relative lg:z-0 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:block`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="hidden border-b border-gray-200 p-4 dark:border-gray-700 lg:block">
            <div className="mb-4 flex items-center justify-between">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                MME msg
              </motion.h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Bell className="h-5 w-5" />
                  <motion.span 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
                  />
                </motion.button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* New Message Button */}
          <div className="p-4">
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              New Message
            </motion.button>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList />
          </div>

          {/* User Profile Card */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <UserProfile />
          </div>
        </div>
      </motion.aside>

      {/* Main Content - Chat Window */}
      <main className="flex flex-1 flex-col pt-16 lg:pt-0">
        {activeConversation ? (
          <ChatWindow />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-1 flex-col items-center justify-center text-gray-500 dark:text-gray-400"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <MessageSquare className="h-24 w-24 opacity-50" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl font-semibold"
            >
              No conversation selected
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-sm"
            >
              Choose a conversation or start a new one
            </motion.p>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}
