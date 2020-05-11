import Head from "next/head";
import NextLink from "next/link";
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
        <Flex align="center">
          <Flex align="flex-end"></Flex>
          <Flex align="center" flexGrow="1" justify="center" />
          <Box>
            <SignInButton />
          </Box>
        </Flex>
        <Column>
          <Heading mt="100px" mb="4px" fontSize="4xl">
            Ghosttype is a stupidly simple blogging platform
          </Heading>
          <Text fontSize="lg" mb="12px">
            Create a minimal, barebones style blog in seconds. You know, like
            those jekyll with gatsby on netlify or github pages blogs you've
            been too lazy so set up.
          </Text>

          <Link href="/api/login">
            <Button width="100%" variant="outline" size="md" mb="12px">
              <Text fontSize="md">Sign Up</Text>
            </Button>
          </Link>
          <Divider mb="28px" />

          <Text fontSize="lg" mb="12px">
            I mostly made this because I was too lazy to set that stuff up
            myself and all the existing blogging platforms felt so bloated and
            overdone, so I figured maybe other people would feel the same as
            well.
          </Text>
          <Text fontSize="lg" mb="12px">
            There's something about blogs I really like and miss from the old
            internet. All the content these days feels so overly commercialized
            or bloated, and the only closest proxy to a classic blog is
            newsletters, which feel too ephemeral and not timeless the way blog
            posts are.
          </Text>
          <Text fontSize="lg" mb="36px">
            You can check out some example blogs if you'd like as well. If you
            want me to feature yours, just dm me on twitter{" "}
            <Link target="_blank" href="https://twitter.com/ghosttyped">
              @ghosttyped
            </Link>
            .
          </Text>
          <Link>
            <Heading as="h2" mb="8px" fontStyle="bold" fontSize="2xl">
              <NextLink href="/ghosttyped">@Ghosttyped's Blog</NextLink>
            </Heading>
          </Link>
          <Text fontSize="lg">
            David's personal blog, set up right here on this site!
          </Text>
          <Box height="40px" />
          <Text fontSize="lg" fontWeight="bold">
            Are there more features coming soon?
          </Text>
          <Text fontSize="lg" mb="12px">
            Yeah I'll add little things here and there as people ask for things
            and I figure out what's missing. Feel free to contact me if you have
            a feature request!
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Is this going to stay up forever?
          </Text>
          <Text fontSize="lg" mb="12px">
            I hope so? Ideally I'd like to keep it up and free forever but
            databases aren't free so if people use this enough to the point
            where I can't afford to keep it up I'll have to charge or something.
            If you'd like to donate database/cloud credits to me let me know as
            well!
          </Text>
          <Box height="200px" />
        </Column>
      </Container>
    </>
  );
}
