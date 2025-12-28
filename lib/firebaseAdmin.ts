import admin from 'firebase-admin';

let adminAuth: admin.auth.Auth | null = null;
let adminDb: admin.firestore.Firestore | null = null;

if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      
      adminAuth = admin.auth();
      adminDb = admin.firestore();
    } else {
      console.warn('Firebase admin credentials not provided. Running without Firebase admin.');
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export { adminAuth, adminDb };
export default admin;
