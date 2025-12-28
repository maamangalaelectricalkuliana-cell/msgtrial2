export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'employee' | 'vendor' | 'owner';
  businessRole?: string;
  bio?: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  googleId: string;
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  preferences: UserPreferences;
  settings: UserSettings;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  sound: boolean;
  emailNotifications: boolean;
  lastSeenVisibility: boolean;
  onlineStatusVisible: boolean;
  readReceipts: boolean;
}

export interface UserSettings {
  fontSize: 'small' | 'medium' | 'large';
  displayMode: 'comfortable' | 'compact';
  accentColor: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  contentType: 'text' | 'image' | 'file' | 'audio' | 'video';
  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];
  replies?: MessageReply[];
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  readBy: ReadReceipt[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export interface MessageAttachment {
  id: string;
  filename: string;
  fileSize: number;
  fileType: string;
  url: string;
  thumbnail?: string;
  uploadedAt: Date;
}

export interface MessageReaction {
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface MessageReply {
  messageId: string;
  content: string;
}

export interface ReadReceipt {
  userId: string;
  readAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt?: Date;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isMuted: boolean;
  isArchived: boolean;
  unreadCount?: Record<string, number>;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  userName: string;
}

export interface OnlineStatus {
  userId: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: Date;
}
