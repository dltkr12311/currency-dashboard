/**
 * API Route for current exchange rates (for SEO meta tags)
 */

import { currencyApi } from '@/services';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const exchangeData = await currencyApi.fetchExchangeRates('USD');

    if (!exchangeData) {
      return NextResponse.json(
        { error: 'Failed to fetch exchange rates' },
        { status: 500 }
      );
    }

    const { conversion_rates: rates, time_last_update_utc: lastUpdate } =
      exchangeData;

    // 주요 환율 추출
    const currentRates = {
      USD_KRW: Math.round(rates.KRW),
      EUR_KRW: Math.round(rates.KRW / rates.EUR),
      JPY_KRW: Math.round((rates.KRW / rates.JPY) * 100) / 100,
      GBP_KRW: Math.round(rates.KRW / rates.GBP),
      CNY_KRW: Math.round(rates.KRW / rates.CNY),
      lastUpdate,
    };

    return NextResponse.json(currentRates, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error in current-rates API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
