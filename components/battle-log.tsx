"use client";

import { useBattleStore, usePlayerStore } from "@/app/store/pokemon.store";

export function BattleLog() {
  const battleLog = useBattleStore((state) => state.battleLog);
  const { players } = usePlayerStore();

  if (battleLog.length === 0 || Object.keys(players).length === 0) return null;

  return (
    <div
      className="mt-4 max-full mx-auto
             max-h-40 overflow-y-auto
             scroll-smooth
             bg-green-900/90 backdrop-blur
             rounded-2xl p-4 text-white
             scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent"
    >
      <h4 className="text-center font-bold mb-2">Battle Log</h4>

      <ul className="space-y-1 max-h-32 overflow-y-auto flex flex-col-reverse text-center">
        {battleLog.map((log, i) => (
          <li key={i} className="animate-fade-in">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}
