"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePokemonStore } from "@/app/store/pokemon.store";
import { useSound } from "@/hooks/useSound";

const battlegrounds = [
  "/assets/battle-arena-hell.webp",
  "/assets/temple-background-stone.webp",
  "/assets/forest-battleground.webp",
];

export default function BattlegroundSlider() {
  const { add } = usePokemonStore();
  const [index, setIndex] = useState(0);
  const battlegroundSound = useSound("/assets/audio/battleground.mp3");

  const prev = () =>
    setIndex((i) => (i === 0 ? battlegrounds.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === battlegrounds.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {/* Title */}
      <h3 className="text-sm">Battleground</h3>

      {/* Image Wrapper */}
      <div
        className="relative w-[150px] h-[70px] overflow-hidden rounded-xl cursor-pointer"
      >
        <Image
          key={battlegrounds[index]}
          src={battlegrounds[index]}
          alt="Battleground"
          fill
          className="object-cover transition-all duration-500"
          priority
          onClick={() => {
            add(battlegrounds[index])
            battlegroundSound();
          }}
        />

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 px-2 py-1 rounded text-white cursor-pointer"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 px-2 py-1 rounded text-white cursor-pointer"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 items-center justify-center">
        {battlegrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 w-1 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
