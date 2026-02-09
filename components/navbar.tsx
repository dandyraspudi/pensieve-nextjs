"use client";

import Image from "next/image";
import BattlegroundSlider from "./battleground-slider";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between">
      {/* LEFT LOGO */}
      <Image
        src="/assets/pokedex-logo.png"
        alt="Pokedex"
        width={120}
        height={40}
      />

      {/* RIGHT CAROUSEL */}
      <BattlegroundSlider />
    </nav>
  );
}
