import { create } from 'zustand';
import { User, Conversation, Message, TypingIndicator } from './types';

interface AppState {
  user: User | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Record<string, Message[]>;
  typingIndicators: TypingIndicator[];
  onlineUsers: Set<string>;
  theme: 'light' | 'dark';
  
  setUser: (user: User | null) => void;
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (conversation: Conversation | null) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  addTypingIndicator: (indicator: TypingIndicator) => void;
  removeTypingIndicator: (userId: string, conversationId: string) => void;
  setOnlineUsers: (users: Set<string>) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  conversations: [],
  activeConversation: null,
  messages: {},
  typingIndicators: [],
  onlineUsers: new Set(),
  theme: 'light',
  
  setUser: (user) => set({ user }),
  
  setConversations: (conversations) => set({ conversations }),
  
  setActiveConversation: (conversation) => set({ activeConversation: conversation }),
  
  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    })),
  
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: messages,
      },
    })),
  
  updateMessage: (conversationId, messageId, updates) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: state.messages[conversationId]?.map((msg) =>
          msg.id === messageId ? { ...msg, ...updates } : msg
        ) || [],
      },
    })),
  
  deleteMessage: (conversationId, messageId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: state.messages[conversationId]?.map((msg) =>
          msg.id === messageId ? { ...msg, isDeleted: true, deletedAt: new Date() } : msg
        ) || [],
      },
    })),
  
  addTypingIndicator: (indicator) =>
    set((state) => ({
      typingIndicators: [...state.typingIndicators.filter(
        (i) => !(i.userId === indicator.userId && i.conversationId === indicator.conversationId)
      ), indicator],
    })),
  
  removeTypingIndicator: (userId, conversationId) =>
    set((state) => ({
      typingIndicators: state.typingIndicators.filter(
        (i) => !(i.userId === userId && i.conversationId === conversationId)
      ),
    })),
  
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
      return { theme: newTheme };
    }),
  
  setTheme: (theme) =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
      return { theme };
    }),
}));
