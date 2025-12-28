import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { adminDb } from '@/lib/firebaseAdmin';
import { generateVerificationCode } from '@/lib/utils';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!adminDb) {
      return NextResponse.json(
        { message: 'Database not configured' },
        { status: 503 }
      );
    }

    const userDoc = await adminDb.collection('users').doc(session.user.id).get();
    
    if (!userDoc.exists) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    
    if (userData?.isVerified) {
      return NextResponse.json({ message: 'Email already verified' });
    }

    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date();
    verificationCodeExpiry.setHours(verificationCodeExpiry.getHours() + 24);

    await adminDb.collection('users').doc(session.user.id).update({
      verificationCode,
      verificationCodeExpiry: verificationCodeExpiry.toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log(`New verification code for ${session.user.email}: ${verificationCode}`);

    return NextResponse.json({ 
      message: 'Verification code sent',
      verificationCode
    });
  } catch (error) {
    console.error('Error resending verification:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
