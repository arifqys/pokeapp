import { Button, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import PageHeader from "../src/components/PageHeader";
import PokemonCard from "../src/components/PokemonCard";
import useMyPokemon from "../src/hooks/my-pokemon";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 12,
  offset: 0,
};

export default function Home() {
  const { loading, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
    notifyOnNetworkStatusChange: true,
  });

  const { myPokemons } = useMyPokemon();

  const PokemonCardSkeletons = [...Array(12).keys()].map((num) => (
    <Skeleton height="105px" key={num} />
  ));

  return (
    <>
      <Head>
        <title>Pokeapp - Pokemon List</title>
      </Head>

      <PageHeader title="Pokemon List" />

      <SimpleGrid columns={[2, 3]} spacing={[3, 5]}>
        {data?.pokemons?.results?.map((pokemon) => (
          <PokemonCard
            amountOwned={
              myPokemons.filter(({ name }) => name === pokemon.name).length
            }
            key={pokemon.name}
            pokemon={pokemon}
          />
        ))}
        {loading && PokemonCardSkeletons}
      </SimpleGrid>

      {!!data?.pokemons?.results?.length && (
        <Button
          isFullWidth
          isLoading={loading}
          loadingText="Loading..."
          mt={5}
          onClick={() =>
            fetchMore({
              variables: { offset: data.pokemons.results.length },
            })
          }
        >
          Load More
        </Button>
      )}
    </>
  );
}
