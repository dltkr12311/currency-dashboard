import { currencyApi } from '@/services';
import { CurrencyCode } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const base = searchParams.get('base') as CurrencyCode;
    const target = searchParams.get('target') as CurrencyCode;

    if (!base) {
      return NextResponse.json(
        {
          success: false,
          error: 'Base currency is required',
        },
        { status: 400 }
      );
    }

    // Get exchange rates for the base currency
    const exchangeData = await currencyApi.fetchExchangeRates(base);

    if (!exchangeData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch exchange rates',
        },
        { status: 500 }
      );
    }

    // If target currency is specified, return only that rate
    if (target) {
      const rate = exchangeData.conversion_rates[target];
      if (!rate) {
        return NextResponse.json(
          {
            success: false,
            error: `Exchange rate not found for ${target}`,
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          base,
          target,
          rate,
          lastUpdated: exchangeData.time_last_update_utc,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Return all rates
    return NextResponse.json({
      success: true,
      data: {
        base,
        rates: exchangeData.conversion_rates,
        lastUpdated: exchangeData.time_last_update_utc,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch currency rates',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; // Cache for 1 hour
