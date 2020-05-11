import Head from "next/head";

import {
  Button,
  Flex,
  Heading,
  Text,
  Box,
  Divider,
  Link,
} from "@chakra-ui/core";

import { Container } from "../components/container";
import { Column } from "../components/column";
import SignInButton from "../components/admin/signInButton";

export default function Home() {
  return (
    <>
      <Container>
        <Flex align="center">
          <Flex align="flex-end" />
          <Flex align="center" flexGrow="1" justify="center" />
          <Box>
            <SignInButton />
          </Box>
        </Flex>
        <Column>
          <Box mt="100px" mb="24px">
            <Heading mb="12px" fontSize="4xl">
              Welcome to your admin panel
            </Heading>
            <Text fontSize="lg" mb="24px">
              This is where you'll be able to see your articles and write them.
              Unfortunately I haven't built this part yet. You can logout at
              least though!
            </Text>
            <Link href="/api/logout">
              <Button variant="outline" size="md" mb="12px">
                <Text fontSize="md">Log Out</Text>
              </Button>
            </Link>
          </Box>
        </Column>
        <Divider />
        <Column>
          <Text mt="36px" fontSize="lg">
            Coming soon lmao
          </Text>
          <Box height="200px" />
        </Column>
      </Container>
    </>
  );
}
