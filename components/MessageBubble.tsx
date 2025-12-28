'use client';

import { useState } from 'react';
import { Message } from '@/lib/types';
import { formatMessageTime } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, CheckCheck, MoreVertical, Reply, Copy, Smile } from 'lucide-react';
import toast from 'react-hot-toast';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Copied to clipboard!');
    setShowActions(false);
  };

  const handleReact = (emoji: string) => {
    toast.success(`Reacted with ${emoji}`);
    setShowActions(false);
  };

  if (message.isDeleted) {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <div className="rounded-2xl bg-gray-200 px-4 py-2 text-sm italic text-gray-500 dark:bg-gray-700 dark:text-gray-400">
          Message deleted
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`group flex ${isOwn ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`relative max-w-lg ${isOwn ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwn
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-900 dark:bg-gray-800 dark:text-white'
          }`}
        >
          <p className="break-words text-sm">{message.content}</p>
          <div className="mt-1 flex items-center justify-end gap-1">
            <span
              className={`text-xs ${
                isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {formatMessageTime(message.createdAt)}
            </span>
            {message.isEdited && (
              <span
                className={`text-xs ${
                  isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                • edited
              </span>
            )}
            {isOwn && (
              <span className="ml-1">
                {message.readBy.length > 0 ? (
                  <CheckCheck className="h-3 w-3 text-blue-200" />
                ) : (
                  <Check className="h-3 w-3 text-blue-200" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="absolute -bottom-2 left-2 flex gap-1">
            {message.reactions.map((reaction, index) => (
              <span
                key={index}
                className="rounded-full bg-white px-2 py-1 text-xs shadow-sm dark:bg-gray-700"
              >
                {reaction.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: isOwn ? 10 : -10 }}
          animate={{ opacity: showActions ? 1 : 0, x: 0 }}
          className={`absolute top-0 flex gap-1 ${
            isOwn ? '-left-24' : '-right-24'
          }`}
        >
          <button
            onClick={() => handleReact('❤️')}
            className="rounded-lg bg-white p-1.5 shadow-md hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
            title="React"
          >
            <Smile className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-white p-1.5 shadow-md hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
            title="Copy"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            className="rounded-lg bg-white p-1.5 shadow-md hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
            title="Reply"
          >
            <Reply className="h-4 w-4" />
          </button>
          <button
            className="rounded-lg bg-white p-1.5 shadow-md hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
            title="More"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
