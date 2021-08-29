import { Button, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import PageHeader from "../src/components/PageHeader";
import useMyPokemon from "../src/hooks/my-pokemon";

export default function MyPokemon() {
  const { myPokemons, removeFromMyPokemons } = useMyPokemon();

  return (
    <>
      <PageHeader title="My Pokemon List" />

      <UnorderedList>
        {myPokemons.map((pokemon) => (
          <ListItem alignItems="center" display="flex" key={pokemon.nickname}>
            <Image
              alt={pokemon.nickname}
              height={30}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              width={30}
            />
            <Text fontWeight="bold" mx={2}>
              {pokemon.nickname}
            </Text>
            ({pokemon.name})
            <Button
              colorScheme="red"
              ml={5}
              onClick={() => removeFromMyPokemons(pokemon.nickname)}
              size="xs"
            >
              Release {pokemon.nickname}
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
}
