"use client";

import { useEffect, useState, useMemo } from "react";
import { PokemonCard } from "./pokemon-card";
import {
  useBattleStore,
  usePlayerStore,
  usePokemonListStore,
} from "@/app/store/pokemon.store";
import { getPokemon } from "@/lib/pokemonAPI";
import { getPokemonGQL } from "@/lib/pokemonAPIGql";
import { SearchBar } from "./search-bar";
import { ExperienceFilter } from "@/components/experience-filter";
import { TypeFilter } from "@/components/type-filter";
import { useSound } from "@/hooks/useSound";

interface PokemonGridProps {
  pokemonListData: any[];
}

export function PokemonGrid({ pokemonListData }: PokemonGridProps) {
  const clickSound = useSound("/assets/audio/item-click.mp3");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [selectedType, setSelectedType] = useState("all");
  const { setPlayer } = usePlayerStore();
  const setPokemon = usePokemonListStore((state) => state.setPokemon);
  const playerActive = usePlayerStore((state) => state.activePlayer);
  const { battleLog } = useBattleStore();

  const listPokemon = usePokemonListStore((state) => state.pokemonList);

  const activePlayer = (player: string) =>
    player === playerActive ? "bg-gray-100 text-slate-900 font-bold" : "";

  // ✅ FETCH & SET KE STORE
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await Promise.all(
        // pokemonListData.map((pokemon: any) => getPokemon(pokemon.name)),
        pokemonListData.map((pokemon: any) => getPokemonGQL(pokemon.name)),
      );

      setPokemon(details); // ✅ ARRAY MASUK STORE
    };

    fetchPokemonDetails();
  }, [pokemonListData, setPokemon]);

  // filter
  const filteredPokemon = useMemo(() => {
    let list = [...listPokemon];

    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedType !== "all") {
      list = list.filter((p) => p.types.some((t) => t === selectedType));
    }

    if (sort === "asc") {
      list.sort((a, b) => a.base_experience - b.base_experience);
    }

    if (sort === "desc") {
      list.sort((a, b) => b.base_experience - a.base_experience);
    }

    return list;
  }, [search, sort, selectedType, listPokemon]);

  return !battleLog.length && (
    <>
      <div className="flex justify-end items-center pt-5 pb-2">
        <div className="flex gap-3 items-center">
          <div
            className={`text-sm border-2 border-double border-amber-50 px-4 py-1 rounded-xl cursor-pointer hover:bg-amber-100 hover:scale-105 transition-all hover:text-slate-900 hover:font-bold ${activePlayer("player1")}`}
            onClick={() => {
              setPlayer("player1");
              clickSound();
            }}
          >
            Player 1
          </div>
          <div
            className={`text-sm border-2 border-double border-amber-50 px-4 py-1 rounded-xl cursor-pointer hover:bg-amber-100 hover:scale-105 transition-all hover:text-slate-900 hover:font-bold ${activePlayer("player2")}`}
            onClick={() => {
              setPlayer("player2");
              clickSound();
            }}
          >
            Player 2
          </div>
        </div>
      </div>

      {/* filter section */}
      <div className="px-2 py-5">
        <div className="flex item-center gap-6 pb-3">
          <ExperienceFilter sort={sort} setSort={setSort} />
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <TypeFilter
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 justify-items-center">
        {filteredPokemon.map((item: any) => (
          <PokemonCard key={item.name} data={item} />
        ))}
      </div>
    </>
  );
}
