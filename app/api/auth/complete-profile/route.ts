import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { adminDb } from '@/lib/firebaseAdmin';
import { generateVerificationCode } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { phone, role, businessRole } = await req.json();

    if (!phone || !role) {
      return NextResponse.json(
        { message: 'Phone and role are required' },
        { status: 400 }
      );
    }

    if (!adminDb) {
      return NextResponse.json(
        { message: 'Database not configured' },
        { status: 503 }
      );
    }

    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date();
    verificationCodeExpiry.setHours(verificationCodeExpiry.getHours() + 24);

    await adminDb.collection('users').doc(session.user.id).update({
      phone,
      role,
      businessRole: businessRole || '',
      verificationCode,
      verificationCodeExpiry: verificationCodeExpiry.toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log(`Verification code for ${session.user.email}: ${verificationCode}`);

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      verificationCode
    });
  } catch (error) {
    console.error('Error completing profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
