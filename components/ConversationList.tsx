'use client';

import { useStore } from '@/lib/store';
import { formatTimestamp, getInitials } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Conversation } from '@/lib/types';
import Image from 'next/image';

const FIVE_MIN_AGO = new Date(new Date().getTime() - 1000 * 60 * 5);
const ONE_HOUR_AGO = new Date(new Date().getTime() - 1000 * 60 * 60);
const ONE_DAY_AGO = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
const NOW = new Date();

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['user1', 'user2'],
    name: 'John Doe',
    avatar: '',
    lastMessage: 'Hey, how are you doing?',
    lastMessageAt: FIVE_MIN_AGO,
    unreadCount: { user1: 2 },
    createdAt: NOW,
    updatedAt: NOW,
    isMuted: false,
    isArchived: false,
  },
  {
    id: '2',
    participants: ['user1', 'user3'],
    name: 'Jane Smith',
    avatar: '',
    lastMessage: 'The project is looking good!',
    lastMessageAt: ONE_HOUR_AGO,
    unreadCount: {},
    createdAt: NOW,
    updatedAt: NOW,
    isMuted: false,
    isArchived: false,
  },
  {
    id: '3',
    participants: ['user1', 'user4'],
    name: 'Mike Johnson',
    avatar: '',
    lastMessage: 'Let me know when you are available',
    lastMessageAt: ONE_DAY_AGO,
    unreadCount: {},
    createdAt: NOW,
    updatedAt: NOW,
    isMuted: false,
    isArchived: false,
  },
];

export default function ConversationList() {
  const { conversations, activeConversation, setActiveConversation, onlineUsers } = useStore();

  const displayConversations = conversations.length > 0 ? conversations : mockConversations;

  return (
    <div className="space-y-1">
      {displayConversations.map((conversation, index) => {
        const isOnline = onlineUsers.has(conversation.participants[1]);
        const userId = conversation.participants[0];
        const unreadCount = conversation.unreadCount?.[userId as keyof typeof conversation.unreadCount] || 0;
        
        return (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setActiveConversation(conversation)}
            className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
              activeConversation?.id === conversation.id
                ? 'bg-blue-50 dark:bg-blue-900/20'
                : ''
            }`}
          >
            <div className="relative">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold overflow-hidden">
                {conversation.avatar ? (
                  <Image
                    src={conversation.avatar}
                    alt={conversation.name || ''}
                    fill
                    className="object-cover"
                  />
                ) : (
                  getInitials(conversation.name || 'User')
                )}
              </div>
              {isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-800" />
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {conversation.name || 'Unknown'}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {conversation.lastMessageAt && formatTimestamp(conversation.lastMessageAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="truncate text-sm text-gray-600 dark:text-gray-400">
                  {conversation.lastMessage || 'No messages yet'}
                </p>
                {unreadCount > 0 && (
                  <span className="ml-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
