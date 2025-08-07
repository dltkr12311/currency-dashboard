import { UnitConversion } from '@/types/unit';
import {
  canConvert,
  convertUnit,
  formatUnitValue,
} from '@/utils/unit-conversion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fromUnit = searchParams.get('from');
    const toUnit = searchParams.get('to');
    const amount = searchParams.get('amount');
    const category = searchParams.get('category');

    // Validate required parameters
    if (!fromUnit || !toUnit || !amount || !category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: from, to, amount, category',
        },
        { status: 400 }
      );
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid amount value',
        },
        { status: 400 }
      );
    }

    // Check if conversion is possible
    if (!canConvert(fromUnit, toUnit)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot convert between these units',
        },
        { status: 400 }
      );
    }

    // Perform conversion
    const convertedValue = convertUnit(
      numericAmount,
      fromUnit,
      toUnit,
      category
    );
    const formattedValue = formatUnitValue(convertedValue, toUnit);

    const result: UnitConversion = {
      fromUnit,
      toUnit,
      fromValue: numericAmount,
      toValue: convertedValue,
      category,
    };

    return NextResponse.json({
      success: true,
      data: result,
      formatted: {
        fromValue: formatUnitValue(numericAmount, fromUnit),
        toValue: formattedValue,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error converting units:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to convert units',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversions } = body;

    if (!Array.isArray(conversions)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Conversions must be an array',
        },
        { status: 400 }
      );
    }

    const results = conversions.map(
      (conv: {
        fromUnit: string;
        toUnit: string;
        amount: string;
        category: string;
      }) => {
        try {
          const { fromUnit, toUnit, amount, category } = conv;

          if (!fromUnit || !toUnit || !amount || !category) {
            throw new Error('Missing required parameters');
          }

          const numericAmount = parseFloat(amount);
          if (isNaN(numericAmount)) {
            throw new Error('Invalid amount value');
          }

          if (!canConvert(fromUnit, toUnit)) {
            throw new Error('Cannot convert between these units');
          }

          const convertedValue = convertUnit(
            numericAmount,
            fromUnit,
            toUnit,
            category
          );

          return {
            success: true,
            data: {
              fromUnit,
              toUnit,
              fromValue: numericAmount,
              toValue: convertedValue,
              category,
            },
            formatted: {
              fromValue: formatUnitValue(numericAmount, fromUnit),
              toValue: formatUnitValue(convertedValue, toUnit),
            },
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Conversion failed',
          };
        }
      }
    );

    return NextResponse.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing batch conversions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process conversions',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 0; // No cache for dynamic conversions
