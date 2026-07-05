'use client';

import { useState, useEffect, useCallback } from 'react';

export function useSpeak() {
  // undefined = not yet checked, null = checked/not found, voice = found
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoice(null);
      return;
    }

    const find = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return; // not loaded yet — wait for event
      const hr = voices.find((v) => v.lang === 'hr-HR' || v.lang === 'hr');
      setVoice(hr ?? null);
    };

    find();
    window.speechSynthesis.addEventListener('voiceschanged', find);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', find);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!voice) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.voice = voice;
      utt.lang = 'hr-HR';
      utt.rate = 0.88;
      utt.pitch = 1;
      window.speechSynthesis.speak(utt);
    },
    [voice],
  );

  return {
    speak,
    available: voice != null,   // true only when Croatian voice confirmed
    checked: voice !== undefined, // true after initial check
  };
}
