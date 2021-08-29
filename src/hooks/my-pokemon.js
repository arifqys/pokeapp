import { useEffect, useState } from "react";

export default function useMyPokemon() {
  const [myPokemons, setMyPokemons] = useState(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("myPokemons")) || []
      : []
  );

  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  }, [myPokemons]);

  const addToMyPokemons = (pokemonId, pokemonName, pokemonNickname) => {
    const isNicknameTaken =
      myPokemons.find((pokemon) => pokemon.nickname === pokemonNickname) !==
      undefined;
    if (isNicknameTaken) return false;

    setMyPokemons((prevState) => [
      ...prevState,
      {
        id: pokemonId,
        name: pokemonName,
        nickname: pokemonNickname,
      },
    ]);
    return true;
  };

  const removeFromMyPokemons = (pokemonNickname) => {
    setMyPokemons((prevState) =>
      prevState.filter((pokemon) => pokemon.nickname !== pokemonNickname)
    );
  };

  return { myPokemons, addToMyPokemons, removeFromMyPokemons };
}
