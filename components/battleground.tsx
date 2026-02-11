"use client";

import Image from "next/image";
import {
  usePokemonStore,
  usePlayerStore,
  useBattleStore,
} from "@/app/store/pokemon.store";
import { PokemonImage } from "./pokemon-image";
import { PokemonStatus } from "./pokemon-status";
import { BattleControls } from "./battle-control";

export default function Battleground() {
  const { players } = usePlayerStore();
  const { player1, player2, winner } = useBattleStore();
  const imgUrl = usePokemonStore((state) => state.selected[0]);
  const imgMiddleSrc =
    players["player1"] || players["player2"]
      ? "/assets/versus.webp"
      : "/assets/pokemon-logo.webp";

  const glowColor = {
    fire: "rgba(255,120,0,0.8)",
    water: "rgba(0,180,255,0.8)",
    grass: "rgba(0,255,120,0.8)",
  };

  if (!imgUrl) return null;

  return (
    <>
      <div className="relative w-full h-[180px] sm:h-[240px] md:h-[500px] rounded-2xl overflow-hidden">
        <Image
          src={imgUrl}
          alt="Battleground"
          key={imgUrl}
          fill
          className="object-cover"
          priority
        />

        {/* pokemon fight */}
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="h-full w-full flex justify-center items-center">
            {players["player1"] && (
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`relative animate-lightning animate-pop animate-alive-left ${winner === "player1" ? "animate-winner" : ""}`}
                  style={{
                    filter: `drop-shadow(0 0 40px ${glowColor[(players["player1"].types[0]?.type?.name as keyof typeof glowColor) || "fire"]})`,
                  }}
                >
                  {/* win */}
                  <div>
                    {winner === "player1" && (
                      <div className="absolute flex flex-col items-start justify-center pointer-events-none" style={{top: "-20px"}}>
                        <Image
                          src="/assets/winner.webp"
                          alt="win"
                          width={200}
                          height={100}
                          className="animate-pop animate-winner"
                        />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 opacity-0 animate-lightning pointer-events-none" />
                  <PokemonImage
                    image={
                      players["player1"].sprites.other["official-artwork"]
                        .front_default
                    }
                    name={players["player1"].name}
                    height={320}
                    width={150}
                  />
                </div>
                <PokemonStatus
                  name={players["player1"].name}
                  hp={player1?.hp ?? players["player1"].stats[0].base_stat}
                  maxHp={player1?.maxHp ?? 100}
                  exp={players["player1"].stats[1].base_stat}
                  maxExp={100}
                  attack={players["player1"].stats[2].base_stat}
                  maxAttack={100}
                  defense={players["player1"].stats[3].base_stat}
                  maxDefense={100}
                  speed={players["player1"].stats[4].base_stat}
                  maxSpeed={100}
                />
              </div>
            )}
          </div>
          <div className="h-full w-full flex justify-center items-center">
            {players["player2"] && (
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`relative animate-lightning animate-pop animate-alive-right ${winner === "player2" ? "animate-winner" : ""}`}
                  style={{
                    filter: `drop-shadow(0 0 40px ${glowColor[(players["player2"].types[0]?.type?.name as keyof typeof glowColor) || "fire"]})`,
                  }}
                >
                  {winner === "player2" && (
                      <div className="absolute flex flex-col items-start justify-center pointer-events-none" style={{top: "-20px"}}>
                        <Image
                          src="/assets/winner.webp"
                          alt="win"
                          width={200}
                          height={100}
                          className="animate-pop animate-winner"
                        />
                      </div>
                    )}
                  <div className="absolute inset-0 opacity-0 animate-lightning pointer-events-none" />
                  <PokemonImage
                    image={
                      players["player2"].sprites.other["official-artwork"]
                        .front_default
                    }
                    name={players["player2"].name}
                    height={320}
                    width={150}
                  />
                </div>
                <PokemonStatus
                  name={players["player2"].name}
                  hp={player2?.hp ?? players["player2"].stats[0].base_stat}
                  maxHp={player2?.maxHp ?? 100}
                  exp={players["player2"].stats[1].base_stat}
                  maxExp={100}
                  attack={players["player2"].stats[2].base_stat}
                  maxAttack={100}
                  defense={players["player2"].stats[3].base_stat}
                  maxDefense={100}
                  speed={players["player2"].stats[4].base_stat}
                  maxSpeed={100}
                />
              </div>
            )}
          </div>

          {/* versus */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="px-4 py-2 rounded-full flex justify-center">
              <Image
                src={imgMiddleSrc}
                alt="versus"
                key="versus"
                width={150}
                height={150}
              />
            </div>

            {/* battle controls */}
            <div>
              <BattleControls />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
