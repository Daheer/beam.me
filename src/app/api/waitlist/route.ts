import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';
import { addSubscriber } from '@/lib/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('New waitlist signup:', email);

    // Get IP address and user agent for analytics
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Initialize results
    const results = {
      email: { success: false, error: null as string | null },
      firebase: { success: false, error: null as string | null, isNew: false },
    };

    // Add to Firebase (don't fail if this doesn't work)
    try {
      const firebaseResult = await addSubscriber({
        email,
        source: 'waitlist',
        ipAddress,
        userAgent,
      });
      
      results.firebase = {
        success: firebaseResult.success,
        error: firebaseResult.error || null,
        isNew: firebaseResult.isNew,
      };

      console.log('Firebase result:', firebaseResult);
    } catch (error: unknown) {
      console.error('Firebase error (non-blocking):', error);
      results.firebase.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Send welcome email (don't fail if this doesn't work)
    try {
      await sendWelcomeEmail({
        email,
        firstName,
      });
      
      results.email.success = true;
      console.log('Welcome email sent successfully');
    } catch (error: unknown) {
      console.error('Email error (non-blocking):', error);
      results.email.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Return success regardless of email/Firebase status
    // The important thing is that we captured the signup
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist!',
        details: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 