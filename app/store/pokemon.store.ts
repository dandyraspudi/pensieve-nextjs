import { create } from "zustand";

type Pokemon = {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
};

type PokemonStore = {
  selected: string[];
  add: (name: string) => void;
  remove: (name: string) => void;
};

type Store = {
  activePlayer: "player1" | "player2";
  players: {
    player1?: string;
    player2?: string;
  };
  setPlayer: (p: "player1" | "player2") => void;
  selectPokemon: (name: string) => void;
  clearPlayers: () => void;
};

type PokemonListStore = {
  pokemonList: any[];
  setPokemon: (list: any[]) => void;
};

type BattleStore = {
  player1: Pokemon | null;
  player2: Pokemon | null;
  turn: "player1" | "player2";
  battleLog: string[];
  winner: "player1" | "player2" | null;
  setPlayers: (p1: Pokemon | null, p2: Pokemon | null) => void;
  play: () => void;
  fight: () => void;
  reset: () => void;
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  selected: ["/assets/forest-battleground.webp"],
  add: (name) =>
    set((state) => ({
      selected: [name],
    })),
  remove: (name) =>
    set((state) => ({
      selected: state.selected.filter((n) => n !== name),
    })),
}));

export const usePlayerStore = create<Store>((set, get) => ({
  activePlayer: "player1",
  players: {},
  setPlayer: (p) => set({ activePlayer: p }),
  selectPokemon: (name) =>
    set((state) => ({
      players: {
        ...state.players,
        [state.activePlayer]: name,
      },
    })),
  clearPlayers: () =>
    set(() => ({
      players: {},
    })),
}));

export const usePokemonListStore = create<PokemonListStore>((set) => ({
  pokemonList: [],
  setPokemon: (list) =>
    set(() => ({
      pokemonList: list,
    })),
}));

export const useBattleStore = create<BattleStore>((set, get) => ({
  player1: {
    name: "",
    hp: 0,
    maxHp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
  },
  player2: {
    name: "",
    hp: 0,
    maxHp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
  },
  turn: "player1",
  battleLog: [],
  winner: null,

  setPlayers: (p1, p2) => {
    if (!p1 || !p2) {
      return;
    }

    set({
      player1: {
        ...p1,
        hp: p1.maxHp,
      },
      player2: {
        ...p2,
        hp: p2.maxHp,
      },
      battleLog: [],
      winner: null,
      turn: p1.speed >= p2.speed ? "player1" : "player2",
    });
  },

  play: () => {
    set({
      turn: Math.random() > 0.5 ? "player1" : "player2",
      battleLog: ["Battle ready!"],
      winner: null,
    });
  },

  fight: () => {
    const { player1, player2, turn, battleLog, winner } = get();
    if (!player1 || !player2 || winner) return;

    const attacker = turn === "player1" ? player1 : player2;
    const defender = turn === "player1" ? player2 : player1;

    const damage = Math.max(
      1,
      Math.floor(
        attacker.attack * 0.6 +
          attacker.speed * 0.2 -
          defender.defense * 0.3 +
          Math.random() * 10,
      ),
    );

    const newHp = Math.max(0, defender.hp - damage);
    const updatedDefender = { ...defender, hp: newHp };

    const nextTurn = turn === "player1" ? "player2" : "player1";

    if (newHp === 0) {
      set({
        winner: turn,
        battleLog: [...battleLog, `${attacker.name} WINS! 🏆`],
      });
      return;
    }

    set({
      player1: turn === "player1" ? player1 : updatedDefender,
      player2: turn === "player2" ? player2 : updatedDefender,
      turn: nextTurn,
      battleLog: [
        ...battleLog,
        `${attacker.name} hits ${defender.name} for ${damage} damage`,
      ],
    });
  },

  reset: () =>
    set({
      player1: {
        name: "",
        hp: 0,
        maxHp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
      },
      player2: {
        name: "",
        hp: 0,
        maxHp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
      },
      turn: "player1",
      battleLog: [],
      winner: null,
    }),
}));
