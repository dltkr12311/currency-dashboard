/**
 * Clipboard hook - ViewModel for clipboard operations
 */

import { copyToClipboard, isClipboardSupported } from '@/utils';
import { useCallback, useState } from 'react';

interface UseClipboardReturn {
  copied: boolean;
  supported: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

export function useClipboard(resetDelay: number = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      const success = await copyToClipboard(text);

      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      }

      return success;
    },
    [resetDelay]
  );

  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  return {
    copied,
    supported: isClipboardSupported(),
    copy,
    reset,
  };
}
