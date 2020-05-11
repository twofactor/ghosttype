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

import SignInButton from "../components/admin/signInButton";

import { useColorMode } from "@chakra-ui/core";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Container>
        <Column>
          <Heading>Component Testbed</Heading>
          <text>Here I will test components as I build them</text>
          <a href="/api/login">Login</a>
          <a href="/api/logout">Logout</a>
        </Column>
        <Divider />
        <Column>
          <Heading>The Sign In Button</Heading>
          <SignInButton />
        </Column>
      </Container>
    </>
  );
}
