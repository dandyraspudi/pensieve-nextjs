"use client";

import { useEffect, useRef } from "react";
import { useBattleStore, usePlayerStore } from "@/app/store/pokemon.store";
import { useSound } from "@/hooks/useSound";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  const { players } = usePlayerStore();
  const { winner } = useBattleStore();

  const conratulationsSound = useSound("/assets/audio/congratulation.mp3");
  const winnerSound = useSound("/assets/audio/winner.mp3");

  const srcAudio =
    Object.keys(players).length > 1
      ? "/assets/audio/warior-background.mp3"
      : "/assets/audio/background-music.mp3";

  // UNLOCK AUDIO (FIRST INTERACTION)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const unlock = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;

      audio.src = srcAudio; // 🔥 IMPORTANT
      audio.volume = 0.3;
      audio.loop = true;

      audio
        .play()
        .then(() => console.log("🎵 BGM started"))
        .catch(() => console.warn("Autoplay blocked"));

      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock);

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [srcAudio]);

  // SWITCH MUSIC WHEN GAME STATE CHANGES
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasInteracted.current || winner) return;

    audio.pause();
    audio.src = srcAudio;
    audio.load();

    audio.play().catch(() => {});
  }, [srcAudio, winner]);

  // STOP BGM WHEN WINNER
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (winner) {
      audio.pause();
      conratulationsSound();
      winnerSound();
    }
  }, [winner, conratulationsSound, winnerSound]);

  return <audio ref={audioRef} />;
}
