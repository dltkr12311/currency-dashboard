/**
 * Ad Banner Component - Pure View Layer
 */

'use client';

import { ADSENSE_CONFIG } from '@/constants';
import type { AdBannerProps } from '@/types';
import { useEffect } from 'react';

export function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // Type assertion for Google AdSense
      const windowWithAds = window as typeof window & {
        adsbygoogle?: unknown[];
      };
      windowWithAds.adsbygoogle = windowWithAds.adsbygoogle || [];
      windowWithAds.adsbygoogle.push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CONFIG.PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />

      {/* Fallback content for development/ad blockers */}
      <div className='ad-fallback bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center'>
        <p className='text-gray-500 dark:text-gray-400 text-sm'>
          Advertisement Space
        </p>
        <p className='text-xs text-gray-400 dark:text-gray-500 mt-2'>
          {format} format • Slot: {slot}
        </p>
      </div>
    </div>
  );
}
