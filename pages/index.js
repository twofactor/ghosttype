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
  Avatar,
} from "@chakra-ui/core";

import { Container } from "../components/container";
import { Column } from "../components/column";
import SignInButton from "../components/admin/signInButton";

import { useColorMode } from "@chakra-ui/core";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Ghosttype: A Minimalist Blogging Platform</title>
        <meta property="og:title" content="Ghosttype" />
        <meta
          property="og:description"
          content="A minimalist blogging platform."
        />
        <meta
          property="og:image"
          content="https://www.ghosttype.app/ghosttype_meta_cover.png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://www.ghosttype.app" />
        <meta name="twitter:card" content="summary" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
            Ghosttype is a minimalist blogging platform
          </Heading>
          <Text fontSize="lg" mb="12px">
            Create a minimal, barebones style blog in seconds. You know, like
            those jekyll with gatsby on netlify or github pages blogs you've
            been too lazy so set up yourself.
          </Text>
          <Link href="/api/login">
            <Button width="100%" variant="outline" size="md" mb="12px">
              <Text fontSize="md">Sign Up</Text>
            </Button>
          </Link>
          <Divider mb="28px" />
          <Text fontSize="lg" mb="24px">
            You can check out some example blogs if you'd like as well! If you
            have one, think its cool, and want it to be featured on the
            homepage, just hop on twitter and shoot me a DM
            <Link
              target="_blank"
              ml="4px"
              href="https://twitter.com/ghosttyped"
            >
              @ghosttyped
            </Link>
            .
          </Text>
          <Box padding="16px" borderWidth="1px">
            <Link>
              <Heading as="h2" mb="8px" fontStyle="bold" fontSize="2xl">
                <NextLink href="/ghosttyped">
                  <a>@Ghosttyped's Blog</a>
                </NextLink>
              </Heading>
            </Link>
            <Text fontSize="lg">
              David's personal blog, set up right here on this site!
            </Text>
          </Box>
          <Box height="32px" />
          <Text fontSize="lg" fontWeight="bold">
            Why does this exist?
          </Text>
          <Text fontSize="lg" mb="12px">
            I built this because I wanted to set up a hyperminimalist blog. All
            the existing blogging/content platforms felt overly bloated and
            commercial, and newsletters felt too ephemerial - I wanted content
            to stand the test of time to be looked back at later, not to be
            forgotten within a week.
          </Text>{" "}
          <Text fontSize="lg" mb="12px">
            The closest parallel I could find to what I was looking for were
            these Jekyll blogs quite a few people use. Unfortuantely I was too
            lazy to figure out how to use ruby to get jekyll working, So I
            figured maybe other people might be in the same boat as well.
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Are there more features coming soon?
          </Text>
          <Text fontSize="lg" mb="12px">
            Yeah I'll add little things here and there as people ask for things
            and I figure out what's missing. Feel free to contact me if you have
            a feature request! Or an idea. Or found a bug. We don't like bugs.
          </Text>
          <Text fontSize="lg" mb="12px">
            Maybe I might slide some social features here and there so you can
            follow/subscribe to your favorite blogs and friends as well, but I
            want to keep the spirt of this platform intact so who knows.
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Is this going to stay up forever?
          </Text>
          <Text fontSize="lg" mb="12px">
            I hope so? Ideally I'd like to keep it up and free forever but
            servers and databases aren't free so if people use this enough to
            the point where I can't afford to keep it up I'll have to charge a
            small fee/donation or something. If you'd like to donate
            database/cloud credits to me let me know as well!
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Any other useful things to know?
          </Text>
          <Text fontSize="lg" mb="12px">
            Yeah! If you're logged in, you can quickly go to your admin
            dashboard by clicking on your profile picture and name in the top
            right corner.
          </Text>
          <Text fontSize="lg" mb="12px">
            Markdown shortcuts also work when you're writing a post, so you can
            type # or ## or * for headings/lists/etc.
          </Text>
          <Text fontSize="lg" mb="12px">
            Also, I'm looking for more twitter followers. Feel free to
          </Text>
          <a target="_blank" href="http://twitter.com/ghosttyped">
            <Button variant="outline" pl="8px" pr="12px">
              <Avatar
                size="xs"
                name="ghosttyped"
                src="https://pbs.twimg.com/profile_images/1254546118731390978/vC_IGyQe_normal.jpg"
              />
              <Text fontSize="lg" ml="8px">
                Follow David On Twitter
              </Text>
            </Button>
          </a>
          <Box height="200px" />
        </Column>
      </Container>
    </>
  );
}
