'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  useEffect(() => {
    try {
      // Type assertion for Google AdSense
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-YOUR_PUBLISHER_ID' // Replace with your AdSense publisher ID
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

// CSS to hide fallback when ads load
const adStyles = `
  .ad-container ins.adsbygoogle[data-ad-status="filled"] + .ad-fallback {
    display: none;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = adStyles;
  document.head.appendChild(styleSheet);
}
