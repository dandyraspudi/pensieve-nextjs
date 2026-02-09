"use client";

import { useSound } from "@/hooks/useSound";

const POKEMON_TYPES = [
  "all",
  "fire",
  "water",
  "grass",
  "electric",
  "flying",
  "normal",
  "poison",
  "ground",
  "psychic",
  "fighting",
  "rock",
];

interface TypeFilterProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export function TypeFilter({ selectedType, setSelectedType }: TypeFilterProps) {
  const clickSound = useSound("/assets/audio/item-click.mp3");

  return (
    <div className="flex flex-wrap gap-1">
      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => {
            setSelectedType(type)
            clickSound()
          }}
          className={`
            px-4 py-1 rounded-full text-sm capitalize
            border transition-all cursor-pointer
            ${
              selectedType === type
                ? "bg-emerald-400 text-black font-bold"
                : "border-white/20 text-white hover:bg-white/10"
            }
          `}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
