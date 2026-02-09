import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta");
const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList() {
    const response = await fetch(POKEMON_API + "pokemon?limit=20&offset=0");
    const data = await response.json();

    return data.results;
}

export async function getPokemon(name: string) {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();

    return data;
}

// graphql version
const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int!) {
    pokemon_v2_pokemon(limit: $limit, order_by: { id: asc }) {
      name
    }
  }
`;

export async function getPokemonListGQL(limit = 20) {
  const data = await client.request(GET_POKEMON_LIST, { limit });
  return data.pokemon_v2_pokemon;
}

const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name

      pokemon_v2_pokemonsprites {
        sprites
      }

      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }

      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export async function getPokemonGQL(name: string) {
  const data = await client.request(GET_POKEMON_BY_NAME, { name });

  const pokemon = data.pokemon_v2_pokemon[0];
  if (!pokemon) return null;

  return {
    id: pokemon.id,
    name: pokemon.name,

    sprites:
      pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites ?? {},

    stats: pokemon.pokemon_v2_pokemonstats.map((stat: any) => ({
      name: stat.pokemon_v2_stat.name,
      base_stat: stat.base_stat,
    })),

    types: pokemon.pokemon_v2_pokemontypes.map(
      (t: any) => t.pokemon_v2_type.name
    ),
  };
}
