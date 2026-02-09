"use client";

import { Search } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const clickSound = useSound("/assets/audio/item-click.mp3");

  return (
    <div className="w-full max-w-md relative" onClick={clickSound}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          pl-12 pr-4 py-2
          rounded-xl
          bg-black/40
          text-white
          placeholder:text-white/50
          border border-white/20
        "
      />
    </div>
  );
}
