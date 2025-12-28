# MME msg - Professional Business Messaging Platform

A production-grade web messaging platform for **Maa Mangala Electrical** - an enterprise communication hub for managing customer, employee, and vendor interactions with professional aesthetics and smooth animations.

## 🚀 Features

### Authentication
- ✅ Google OAuth 2.0 integration
- ✅ Email verification with 6-digit code (24-hour expiry)
- ✅ Complete profile setup with phone number and role selection
- ✅ JWT token-based sessions (24 hours with auto-refresh)
- ✅ Secure authentication flow

### Messaging
- ✅ Real-time messaging interface
- ✅ Read receipts and message status indicators
- ✅ Message reactions and emoji support
- ✅ Reply, forward, edit, and delete messages
- ✅ Typing indicators
- ✅ Message grouping by date
- ✅ Smooth animations and transitions

### UI/UX
- ✅ Professional dark/light mode with smooth transitions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Mobile-friendly sidebar drawer
- ✅ Toast notifications
- ✅ Loading states and animations
- ✅ Hover effects and micro-interactions
- ✅ Confetti animation on email verification

### Design System
- ✅ Custom color palette for light and dark modes
- ✅ Professional typography
- ✅ Consistent spacing and layout
- ✅ Custom scrollbars
- ✅ Animated components with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Formatting**: date-fns

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Google OAuth credentials
- Firebase project with Firestore enabled

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mme-msg
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy your Client ID and Client Secret

### 4. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Firebase Storage
5. Go to Project Settings → General → Your apps → Add web app
6. Copy the Firebase configuration
7. Go to Project Settings → Service Accounts → Generate new private key
8. Download the service account JSON file

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl-rand-base64-32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
mme-msg/
├── app/
│   ├── api/              # API routes
│   │   └── auth/         # Authentication endpoints
│   ├── auth/             # Auth pages (signin, verify, complete-profile)
│   ├── dashboard/        # Main messaging interface
│   ├── globals.css       # Global styles with theme variables
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── ChatWindow.tsx    # Main chat interface
│   ├── ConversationList.tsx # Sidebar conversation list
│   ├── MessageBubble.tsx # Individual message component
│   ├── SessionProvider.tsx # NextAuth session wrapper
│   └── UserProfile.tsx   # User profile card
├── lib/
│   ├── firebase.ts       # Firebase client config
│   ├── firebaseAdmin.ts  # Firebase admin config
│   ├── store.ts          # Zustand state management
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── types/                # Type definitions
```

## 🎨 Design Tokens

### Light Mode Colors
- Background: `#F8F9FA`
- Surface: `#FFFFFF`
- Text: `#1A1A1A`
- Accent: `#2563EB`
- Success: `#10B981`
- Error: `#EF4444`

### Dark Mode Colors
- Background: `#0F172A`
- Surface: `#1E293B`
- Text: `#F1F5F9`
- Accent: `#3B82F6`
- Success: `#34D399`
- Error: `#F87171`

## 🔐 Authentication Flow

1. **Sign Up**: User clicks "Get Started" → Google OAuth → Complete profile with phone/role
2. **Verification**: 6-digit code sent (mock) → User enters code → Email verified with confetti
3. **Sign In**: Google OAuth → Automatic redirect to dashboard if verified
4. **Session**: JWT tokens valid for 24 hours with automatic refresh

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column, drawer sidebar)
- **Tablet**: 768px - 1024px (two columns)
- **Desktop**: > 1024px (three columns with right panel)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🧪 Development

### Code Style
- TypeScript strict mode
- Functional components with hooks
- Tailwind CSS for styling
- Framer Motion for animations

### Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📄 License

© 2025 Maa Mangala Electrical. All rights reserved.

## 🆘 Support

For support, please contact the Maa Mangala Electrical team or open an issue in the repository.

---

**Built with ❤️ for Maa Mangala Electrical**
