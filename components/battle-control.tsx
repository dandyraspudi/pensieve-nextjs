import { useBattleStore, usePlayerStore } from "@/app/store/pokemon.store";
import { useSound } from "@/hooks/useSound";
import { useEffect, useState } from "react";

export function BattleControls() {
  const [playGame, setPlayGame] = useState(false);
  const { play, fight, reset, turn, winner } = useBattleStore();
  const { players, clearPlayers } = usePlayerStore();
  const isPlayerComplete = Object.keys(players).length > 1;
  const fightSound = useSound("/assets/audio/kick.mp3");
  const fight2Sound = useSound("/assets/audio/spin.mp3");
  const fightReady = useSound("/assets/audio/fight-2.mp3");

  const disabled = !!winner;

  useEffect(() => {
    if (turn === "player1" && playGame) {
      fightSound();
    } else if (turn === "player2" && playGame) {
      fight2Sound();
    }
  }, [turn, fightSound, fight2Sound]);

  if (!isPlayerComplete) return null;

  return (
    <div className="flex gap-4 justify-center mt-6">
      {/* ▶ PLAY */}
      {!playGame && (
        <button
          onClick={() => {
            play();
            setPlayGame(true);
            fightReady();
          }}
          className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
        >
          ▶ Play
        </button>
      )}

      {/* ⚔ FIGHT */}
      {playGame && !winner && (
        <button
          onClick={fight}
          disabled={disabled}
          className={`px-6 py-2 rounded-xl font-bold text-white cursor-pointer
            ${
              disabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500 animate-pulse"
            }
        `}
        >
          ⚔ FIGHT
        </button>
      )}

      {/* ✖ END */}
      {playGame && (
        <button
          onClick={() => {
            clearPlayers();
            setPlayGame(false);
            reset();
          }}
          className="px-6 py-2 rounded-xl bg-gray-600 hover:bg-gray-500 text-white font-bold cursor-pointer"
        >
          ✖ End Fight
        </button>
      )}
    </div>
  );
}
