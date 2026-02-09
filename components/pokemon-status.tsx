import { ProgressBar } from "@/components/progress-bar";

interface PokemonStatusProps {
  name: string;
  hp: number;
  maxHp: number;
  exp: number;
  maxExp: number;
  attack: number;
  maxAttack: number;
  defense: number;
  maxDefense: number;
  speed: number;
  maxSpeed: number;
}

export function PokemonStatus({
  name,
  hp,
  maxHp,
  exp,
  maxExp,
  attack,
  maxAttack,
  defense,
  maxDefense,
  speed,
  maxSpeed,
}: PokemonStatusProps) {
  return (
    <div className="w-56 bg-black/40 backdrop-blur-md p-4 rounded-xl text-white">
      <h3 className="text-lg font-bold mb-3 text-center">
        {name.toUpperCase()}
      </h3>

      <ProgressBar label="HP" value={hp} max={maxHp} color="bg-red-500" />

      <ProgressBar label="EXP" value={exp} max={maxExp} color="bg-blue-400" />

      <ProgressBar
        label="Attack"
        value={attack}
        max={maxAttack}
        color="bg-yellow-400"
      />

      <ProgressBar
        label="Defense"
        value={defense}
        max={maxDefense}
        color="bg-green-400"
      />

      <ProgressBar
        label="Speed"
        value={speed}
        max={maxSpeed}
        color="bg-purple-400"
      />
    </div>
  );
}
