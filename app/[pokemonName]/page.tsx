import { PokemonImage } from "@/components/pokemon-image";
// import { getPokemon } from "@/lib/pokemonAPI";
import { getPokemonGQL } from "@/lib/pokemonAPIGql";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ pokemonName: string }>;
}) {
  const { pokemonName } = await params;

  // const pokemonData = await getPokemon(pokemonName);
  const pokemonData = await getPokemonGQL(pokemonName);

  if (!pokemonData) {
    return <div>Pokemon not found</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold pt-4 capitalize">{pokemonData.name}</h1>
      <PokemonImage
        image={pokemonData.sprites.other["official-artwork"].front_default}
        name={pokemonData.name}
      />
    </>
  );
}
