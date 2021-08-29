import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          keyArgs: false,
          merge(
            { results: existing = [], ...others } = {},
            { results: incoming }
          ) {
            return {
              ...others,
              results: [...existing, ...incoming],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app",
  cache,
});

export default client;
