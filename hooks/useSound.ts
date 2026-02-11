import { useRef, useEffect } from "react";

export function useSound(src: string, volume: number = 1) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // ✅ only run in browser
    if (typeof window !== "undefined") {
      const audio = new Audio(src);
      audio.volume = volume;
      audioRef.current = audio;
    }
  }, [src, volume]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return play;
}
