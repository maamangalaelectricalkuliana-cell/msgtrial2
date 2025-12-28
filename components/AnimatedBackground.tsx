'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl dark:opacity-10"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl dark:opacity-10"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-20 blur-3xl dark:opacity-10"
      />
    </div>
  );
}
