import { Badge, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ pokemon, amountOwned }) {
  return (
    <Link href={`/${pokemon.name}`} key={pokemon.id} passHref>
      <a>
        <Box borderRadius="lg" borderWidth="1px" position="relative">
          <Image
            alt={pokemon.name}
            height={50}
            src={pokemon.image}
            width={50}
          />

          <Heading as="h2" fontWeight="semibold" p={3} size="md">
            {pokemon.name}
          </Heading>

          {!!amountOwned && (
            <Badge colorScheme="blue" position="absolute" right={0} top={0}>
              {amountOwned} owned
            </Badge>
          )}
        </Box>
      </a>
    </Link>
  );
}
