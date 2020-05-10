import Head from "next/head";
import {
  Button,
  Flex,
  Image,
  Heading,
  Text,
  Box,
  Link,
  Divider,
} from "@chakra-ui/core";

import { Container } from "../components/container";
import { Column } from "../components/column";

import { useColorMode } from "@chakra-ui/core";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Container>
        <Column>
          <Heading>David's Dank Blog</Heading>
          <text>
            Hi there! Welcome to my dank ass blog. There’s some cool stuff here
            but like, i dunno what else I would put here.
          </text>
          <a href="/api/login">Login</a>
          <a href="/api/logout">Logout</a>
          <Box>
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>
          </Box>
        </Column>
        <Divider />
        <Column>
          <Heading>David's Dank Blog</Heading>
          <text>
            Hi there! Welcome to my dank ass blog. There’s some cool stuff here
            but like, i dunno what else I would put here.
          </text>
        </Column>
      </Container>
    </>
  );
}
