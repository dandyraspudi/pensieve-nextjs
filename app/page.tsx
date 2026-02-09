import { PokemonGrid } from "@/components/pokemon-grid";
// import { getPokemonList } from "@/lib/pokemonAPI";
import { getPokemonListGQL } from "@/lib/pokemonAPIGql";
import Navbar from "@/components/navbar";
import Battleground from "@/components/battleground";
import { BattleLog } from "@/components/battle-log";

export default async function Home() {
  // const pokemonList = await getPokemonList();
  const pokemonListGQL = await getPokemonListGQL();

  return (
    <div className="flex min-h-screen items-center justify-center flex-col bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full container">
        <Navbar />
      </div>
      <main className="container min-h-screen w-full bg-white dark:bg-black">
        <Battleground />
        <PokemonGrid pokemonListData={pokemonListGQL} />
        <BattleLog />
      </main>
    </div>
  );
}
