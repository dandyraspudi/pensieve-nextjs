// "use client";

// import { useRef } from "react";

// export function useSound(src: string, volume = 0.5) {
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   if (!audioRef.current) {
//     audioRef.current = new Audio(src);
//     audioRef.current.volume = volume;
//   }

//   // const play = () => {
//   //   audioRef.current!.currentTime = 0;
//   //   audioRef.current!.play();
//   // };
//   const play = () => {
//     if (typeof window === "undefined") return;
//     const audio = new Audio(src);
//     audio.volume = volume;
//     audio.play().catch(() => {});
//   };

//   return play;
// }

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
