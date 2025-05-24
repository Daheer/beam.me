import { NextResponse } from 'next/server';
import { getSubscriberStats } from '@/lib/firestore';

export async function GET() {
  try {
    const stats = await getSubscriberStats();
    
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching subscriber stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriber stats' },
      { status: 500 }
    );
  }
} 