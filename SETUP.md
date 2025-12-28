# 🚀 MME msg - Setup Guide

## Quick Start (Development Mode)

The app can run in development mode without Firebase or Google OAuth for testing the UI and animations.

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the landing page with amazing animations!

## ⚡ Features You Can Test Without Setup

- **Landing Page** - Beautiful animated homepage with gradient text and smooth transitions
- **Dark/Light Mode Toggle** - Click the moon/sun icon to switch themes (with rotation animation!)
- **Responsive Design** - Resize your browser to see mobile/tablet/desktop layouts
- **Message UI** - Navigate to `/dashboard` to see the messaging interface (mock data)
- **Smooth Animations** - Spring animations, hover effects, pulsing buttons, and more!

## 🔧 Full Setup (Production)

To enable authentication and real-time messaging, follow these steps:

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret**

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database** (Start in production mode)
4. Enable **Firebase Storage**
5. Go to **Project Settings** → **General** → **Your apps**
6. Click **Web app** icon and register your app
7. Copy the Firebase configuration

### 3. Firebase Admin (Server-side)

1. In Firebase Console, go to **Project Settings** → **Service Accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. Extract these values from the JSON:
   - `project_id`
   - `client_email`
   - `private_key`

### 4. Environment Variables

Create or update `.env.local` in the project root:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here  # Generate with: openssl rand -base64 32

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
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
```

### 5. Run the Application

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## 🎨 Amazing Animations Included

### Landing Page
- **Gradient Text Animation** - Flowing color gradient on "MME msg" title
- **Spring Animations** - Smooth bounce effects on page load
- **Staggered Entry** - Feature cards appear one by one
- **Hover Effects** - Scale and shadow animations on buttons

### Dashboard
- **Theme Toggle** - 180° rotation animation when switching dark/light mode
- **Pulsing Notifications** - Animated notification badge
- **Smooth Sidebar** - Slide animation for mobile menu
- **Empty State** - Floating message icon with rotation

### Chat Messages
- **Spring Entry** - Messages bounce in with spring physics
- **Hover Actions** - Quick action buttons slide in on hover
- **Reaction Animations** - Emoji reactions pop in with spring effect
- **Typing Indicator** - Bouncing dots animation
- **Send Button Pulse** - Ripple effect when you type

### Buttons & Interactions
- **Hover Scale** - All buttons scale up 1.05-1.1x on hover
- **Tap Feedback** - Scale down to 0.95x when clicked
- **Loading States** - Smooth spinner animations
- **Gradient Backgrounds** - Animated gradient buttons

## 🌙 Dark Mode

The dark mode toggle is located in:
- **Desktop**: Top right corner of the sidebar
- **Mobile**: Top right corner of the header

Features:
- **Instant Toggle** - Click to switch themes immediately
- **Persistent** - Theme saved to localStorage
- **System Preference** - Defaults to your system theme
- **Smooth Transition** - All colors fade smoothly (300ms)
- **Icon Animation** - Moon/Sun icon rotates 180° when toggling

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Single column, drawer sidebar, touch-optimized
- **Tablet** (768px - 1024px): Two columns, collapsible sidebar
- **Desktop** (> 1024px): Three columns with right panel

## 🎭 Testing Without Firebase

Want to just see the UI and animations? No problem!

1. Keep `.env.local` with dummy values (or delete Firebase variables)
2. Run `npm run dev`
3. Visit `http://localhost:3000`
4. Navigate to `/dashboard` directly in the URL
5. You'll see mock conversations and can interact with the UI!

The app gracefully handles missing Firebase credentials and shows warnings in console only.

## 🐛 Troubleshooting

### "Cannot find module 'next-auth'"
```bash
npm install --legacy-peer-deps
```

### Dark mode not working
- Clear browser cache and localStorage
- Check browser console for errors
- Make sure JavaScript is enabled

### Build errors
```bash
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Firebase errors
- Verify all Firebase credentials are correct
- Check Firebase Console for enabled services
- Ensure Firestore rules allow read/write for authenticated users

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
Build the production bundle:
```bash
npm run build
npm start
```

## 📚 Key Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **NextAuth** - Authentication
- **Firebase** - Database & storage
- **Zustand** - State management
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

## 🎉 Enjoy!

The platform is production-ready with professional animations and smooth user experience. All animations follow modern UX principles:
- **Purposeful**: Every animation has a reason
- **Fast**: No animation longer than 300ms for UI feedback
- **Smooth**: Spring physics for natural movement
- **Accessible**: Can be disabled via system preferences

For questions or issues, check the main README.md or open an issue.

---

**Built with ❤️ for Maa Mangala Electrical**
