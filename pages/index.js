import Head from "next/head";
import { Button, Flex, Text, Box } from "@chakra-ui/core";

import { Container } from "../components/container";

import { useColorMode } from "@chakra-ui/core";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container>
      <Box width="100%">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Flex as="nav" align="center">
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Flex>
        <Text>Wassup</Text>
      </Box>
    </Container>
  );
}
