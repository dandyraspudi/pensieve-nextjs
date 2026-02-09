import { useBattleStore, usePlayerStore, usePokemonListStore } from "@/app/store/pokemon.store";
import { PokemonImage } from "./pokemon-image";
import { useSound } from "@/hooks/useSound";

interface PokemonCardPorps {
  data: any;
}

export function PokemonCard({ data }: PokemonCardPorps) {
  const { selectPokemon, players, activePlayer } = usePlayerStore();
  const { setPlayers } = useBattleStore();
  const { pokemonList } = usePokemonListStore();
  const clickSound = useSound("/assets/audio/click.mp3");
  const showSound = useSound("/assets/audio/show.mp3");
  const showSound2 = useSound("/assets/audio/show-2.mp3");

  const pokemonSelected = async (name: string) => {
    const pokemonData = pokemonList.find((p) => p.name === name);
    clickSound();
    selectPokemon(pokemonData);

    if (players[activePlayer]?.name !== data.name) {
      setTimeout(() => {
        if (activePlayer === "player1") {
          showSound();
        } else {
          showSound2();
        }
      }, 50);
    }

    selectForBattle(name);
  };

  const selectForBattle = (pokemonName: string) => {
    const pokemon = pokemonList.find((p) => p.name === pokemonName);
    if (!pokemon) return;

    const formattedPokemon = {
      name: pokemon.name,
      hp: pokemon.stats[0].base_stat,
      maxHp: 100,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
    };

    if (activePlayer === "player1") {
      setPlayers(formattedPokemon, useBattleStore.getState().player2!);
    } else {
      setPlayers(useBattleStore.getState().player1!, formattedPokemon);
    }
  };

  return (
    <>
      <div
        className={`relative max-w-sm m-2 rounded-md overflow-hidden shadow-md bg-white hover:shadow-lg transition cursor-pointer ${players[activePlayer]?.name === data.name ? "border-4 border-red-500" : ""}`}
        onClick={() => pokemonSelected(data.name)}
      >
        <PokemonImage
          image={data.sprites.other["official-artwork"].front_default}
          name={data.name}
        />
      </div>
    </>
  );
}
