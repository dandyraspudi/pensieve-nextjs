"use client";

import { useSound } from "@/hooks/useSound";

interface ExperienceFilterProps {
  sort: string;
  setSort: (value: string) => void;
}

export function ExperienceFilter({ sort, setSort }: ExperienceFilterProps) {
  const clickSound = useSound("/assets/audio/item-click.mp3");

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* SORT */}
      <select
        value={sort}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSort(e.target.value);
          clickSound();
        }}
        className="
          bg-black/40
          text-white
          border border-white/20
          rounded-xl
          px-4 py-2
        "
      >
        <option value="none">Sort by EXP</option>
        <option value="asc">EXP: Low → High</option>
        <option value="desc">EXP: High → Low</option>
      </select>
    </div>
  );
}
