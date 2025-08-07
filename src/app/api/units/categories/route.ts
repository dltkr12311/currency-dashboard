import { UNIT_CATEGORIES } from '@/constants/units';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: UNIT_CATEGORIES,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching unit categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch unit categories',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; // Cache for 1 hour
