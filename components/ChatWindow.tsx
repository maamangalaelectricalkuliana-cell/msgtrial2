'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Search, Loader2 } from 'lucide-react';
import { formatDateDivider, getInitials } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ChatWindow() {
  const { activeConversation, messages, addMessage, typingIndicators } = useStore();
  const { data: session } = useSession();
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationMessages = messages[activeConversation?.id || ''] || [];

  const mockMessages = [
    {
      id: '1',
      conversationId: activeConversation?.id || '',
      senderId: 'user2',
      content: 'Hey! How are you doing?',
      contentType: 'text' as const,
      isEdited: false,
      isDeleted: false,
      readBy: [],
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60),
      isPinned: false,
    },
    {
      id: '2',
      conversationId: activeConversation?.id || '',
      senderId: session?.user?.id || 'user1',
      content: 'I\'m doing great! Just working on the MME msg project.',
      contentType: 'text' as const,
      isEdited: false,
      isDeleted: false,
      readBy: [],
      createdAt: new Date(Date.now() - 1000 * 60 * 50),
      updatedAt: new Date(Date.now() - 1000 * 60 * 50),
      isPinned: false,
    },
    {
      id: '3',
      conversationId: activeConversation?.id || '',
      senderId: 'user2',
      content: 'That sounds exciting! Tell me more about it.',
      contentType: 'text' as const,
      isEdited: false,
      isDeleted: false,
      readBy: [],
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      updatedAt: new Date(Date.now() - 1000 * 60 * 30),
      isPinned: false,
    },
  ];

  const displayMessages = conversationMessages.length > 0 ? conversationMessages : mockMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  const handleSend = async () => {
    if (!messageText.trim() || !activeConversation) return;

    setSending(true);
    
    try {
      const newMessage = {
        id: Date.now().toString(),
        conversationId: activeConversation.id,
        senderId: session?.user?.id || 'user1',
        content: messageText,
        contentType: 'text' as const,
        isEdited: false,
        isDeleted: false,
        readBy: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isPinned: false,
      };

      addMessage(activeConversation.id, newMessage);
      setMessageText('');
      toast.success('Message sent!');
    } catch {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const typingUser = typingIndicators.find(
    (indicator) => indicator.conversationId === activeConversation?.id
  );

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold overflow-hidden">
            {activeConversation?.avatar ? (
              <Image
                src={activeConversation.avatar}
                alt={activeConversation.name || ''}
                fill
                className="object-cover"
              />
            ) : (
              getInitials(activeConversation?.name || 'User')
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {activeConversation?.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Active now
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700" title="Phone">
            <Phone className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700" title="Video">
            <Video className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700" title="Search">
            <Search className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700" title="More">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">
        <div className="space-y-4">
          {displayMessages.map((message, index) => {
            const showDateDivider =
              index === 0 ||
              new Date(displayMessages[index - 1].createdAt).toDateString() !==
                new Date(message.createdAt).toDateString();

            return (
              <div key={message.id}>
                {showDateDivider && (
                  <div className="flex justify-center py-4">
                    <span className="rounded-full bg-white px-4 py-1 text-xs font-medium text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-400">
                      {formatDateDivider(message.createdAt)}
                    </span>
                  </div>
                )}
                <MessageBubble message={message} isOwn={message.senderId === (session?.user?.id || 'user1')} />
              </div>
            );
          })}
          
          {typingUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                <span className="text-xs">{getInitials(typingUser.userName)}</span>
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-2 dark:bg-gray-800">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-end gap-2">
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Smile className="h-5 w-5" />
          </button>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            style={{ maxHeight: '200px' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!messageText.trim() || sending}
            className="rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
