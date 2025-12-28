'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Shield, Zap, Users, CheckCircle, Loader2 } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.isVerified) {
        router.push('/dashboard');
      } else {
        router.push('/auth/verify');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: 'spring',
              stiffness: 200
            }}
            className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl"
          >
            <motion.span
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #2563EB, #3B82F6, #60A5FA, #3B82F6, #2563EB)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              MME msg
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-xl text-gray-600 dark:text-gray-300"
          >
            Maa Mangala Electrical
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-gray-700 dark:text-gray-400"
          >
            Professional Business Messaging Platform
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/auth/signin')}
            className="mt-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800"
          >
            Get Started
          </motion.button>
        </motion.div>

        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: MessageSquare,
              title: 'Real-time Messaging',
              description: 'Instant communication with customers, employees, and vendors',
            },
            {
              icon: Shield,
              title: 'Secure & Private',
              description: 'End-to-end encryption with Google OAuth authentication',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Optimized performance with real-time updates',
            },
            {
              icon: Users,
              title: 'Team Collaboration',
              description: 'Manage all business communications in one place',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
            >
              <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold">Key Features</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              'Read receipts & reactions',
              'File & image sharing',
              'Dark mode support',
              'Typing indicators',
              'Message search',
              'Mobile responsive',
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="mt-16 border-t border-gray-200 py-8 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 Maa Mangala Electrical. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
