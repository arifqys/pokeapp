import {
  Badge,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import PageHeader from "../src/components/PageHeader";
import client from "../src/lib/apollo-client";
import { gql } from "@apollo/client";
import useMyPokemon from "../src/hooks/my-pokemon";
import { useState } from "react";

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      species {
        name
      }
      height
    }
  }
`;

export default function Detail({ pokemon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pokemonNickname, setPokemonNickname] = useState();
  const { addToMyPokemons } = useMyPokemon();
  const toast = useToast();

  const catchPokemon = () => {
    const isSuccess = Math.random() >= 0.5;

    if (isSuccess) {
      setIsOpen(true);
    } else {
      toast({
        title: "Failed to catch pokemon.",
        description: "Failed to catch pokemon, please try it again",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const releasePokemon = () => {
    setPokemonNickname("");
    setIsOpen(false);
  };

  const savePokemon = (e) => {
    e.preventDefault();

    if (addToMyPokemons(pokemon.id, pokemon.name, pokemonNickname)) {
      toast({
        title: `Pokemon saved.`,
        description: `Saved ${pokemon.name} with nickname ${pokemonNickname}.`,
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to save pokemon.",
        description:
          "Nickname must be unique, please try again with another name.",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <PageHeader title={pokemon.name} />

      <Image alt={pokemon.name} height={200} src={pokemon.image} width={200} />

      <Table size="sm">
        <Tbody>
          <Tr>
            <Th>Species:</Th>
            <Td>{pokemon.species.name}</Td>
          </Tr>
          <Tr>
            <Th>Height:</Th>
            <Td>{pokemon.height}</Td>
          </Tr>
          <Tr>
            <Th>Types:</Th>
            <Td>
              {pokemon.types.map(({ type }) => (
                <Badge colorScheme="blue" key={type.name} mb={1} mr={1}>
                  {type.name}
                </Badge>
              ))}
            </Td>
          </Tr>
          <Tr>
            <Th>Moves:</Th>
            <Td>
              {pokemon.moves.map(({ move }) => (
                <Badge key={move.name} mb={1} mr={1}>
                  {move.name}
                </Badge>
              ))}
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <Button colorScheme="blue" my={10} onClick={catchPokemon}>
        Catch Pokemon
      </Button>

      <Modal isOpen={isOpen} size="xl">
        <ModalOverlay />

        <ModalContent>
          <form onSubmit={savePokemon}>
            <ModalHeader>Congrats! you just catched {pokemon.name}</ModalHeader>

            <ModalBody>
              Now please give it a nickname, to save it on your pokemon list
              <Input
                isRequired
                mt={5}
                onChange={(e) => setPokemonNickname(e.target.value)}
                placeholder="Pokemon nickname"
                value={pokemonNickname}
              ></Input>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={releasePokemon}>
                Release Pokemon
              </Button>

              <Button colorScheme="blue" type="submit">
                Save Pokemon
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: GET_POKEMON,
    variables: { name: params.pokemonName },
  });

  return {
    props: {
      pokemon: {
        ...data.pokemon,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.pokemon.id}.png`,
      },
    },
  };
}
