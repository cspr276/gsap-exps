'use client';

import { useCallback } from 'react';
import { playSound, PlaySoundOptions } from '@/lib/sound-engine';
import { SoundAsset } from '@/lib/sound-types';

export function useSound(asset: SoundAsset | string, options: PlaySoundOptions = {}) {
  const play = useCallback(() => {
    if (typeof window === 'undefined') return;
    const dataUri = typeof asset === 'string' ? asset : asset?.dataUri;
    if (!dataUri) return;
    try {
      playSound(dataUri, options).catch(() => {});
    } catch {
      // AudioContext may require user activation
    }
  }, [asset, options]);

  return [play] as const;
}
