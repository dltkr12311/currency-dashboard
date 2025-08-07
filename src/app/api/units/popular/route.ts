import { POPULAR_CONVERSIONS } from '@/constants/units';
import { convertUnit, formatUnitValue } from '@/utils/unit-conversion';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const popularWithValues = POPULAR_CONVERSIONS.map(conversion => {
      const convertedValue = convertUnit(
        1,
        conversion.from,
        conversion.to,
        conversion.category
      );

      return {
        ...conversion,
        rate: convertedValue,
        formatted: {
          from: formatUnitValue(1, conversion.from),
          to: formatUnitValue(convertedValue, conversion.to),
        },
      };
    });

    return NextResponse.json({
      success: true,
      data: popularWithValues,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching popular conversions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch popular conversions',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; // Cache for 1 hour
