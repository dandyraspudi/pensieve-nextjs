"use client";
import Image from "next/image";

export function PokemonImage({
  image,
  name,
  height,
  width,
  customStyle
}: {
  image: string;
  name: string;
  height?: number;
  width?: number;
  customStyle?: string;
}) {

  return (
    <div>
      <Image
        src={image}
        alt={"Pokemon Image " + name}
        height={height || 40}
        width={width || 120}
        priority
        style={{ objectFit: "contain" }}
        className={`transition-opacity opacity-0 duration-[2s] ${customStyle }`}
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
      />
    </div>
  );
}
