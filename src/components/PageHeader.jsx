import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function PageHeader({ title }) {
  return (
    <>
      <Head>
        <title>Pokeapp - {title}</title>
      </Head>

      <Flex
        alignItems="center"
        as="header"
        justifyContent="space-between"
        mb={10}
      >
        <Heading>{title}</Heading>

        <Stack direction={["column", "row"]} spacing={3}>
          <Link href="/">
            <a>
              <Button size="sm">Home</Button>
            </a>
          </Link>

          <Link href="/my-pokemon">
            <a>
              <Button size="sm">My Pokemon List</Button>
            </a>
          </Link>
        </Stack>
      </Flex>
    </>
  );
}
