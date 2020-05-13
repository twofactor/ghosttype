import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { retrievePostsByUser, retrieveUserByUsername } from "../../lib/faunadb";

import {
  Flex,
  Button,
  Heading,
  Text,
  Box,
  Divider,
  Link,
  Avatar,
} from "@chakra-ui/core";
import { useColorMode } from "@chakra-ui/core";

import { Container } from "../../components/container";
import { Column } from "../../components/column";
import SignInButton from "../../components/admin/signInButton";
import NoPost from "../../components/blog/nopost";

import BlogPostPreview from "../../components/blog/blogPostPreview";

export async function getServerSideProps(context) {
  const { blog } = context.params;
  const posts = await retrievePostsByUser(blog);

  const user = await retrieveUserByUsername(blog);

  if (typeof user === "undefined" || typeof posts === undefined) {
    return {
      props: { posts: "", user: "" },
    };
  }

  const postsSorted = posts
    .filter((post) => {
      return post.published;
    })
    .sort((A, B) => {
      return A.date > B.date ? -1 : 1;
    });

  return {
    props: { posts: postsSorted, user: user },
  };
}

export default function BlogPosts({ posts, user }) {
  if (posts === "" && user === "") {
    return (
      <Container>
        <Column>
          <Heading>404: This page doesn't exist</Heading>
          <NoPost />
        </Column>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{user.name}</title>
        <meta property="og:title" content="Ghosttype" />
        <meta
          property="og:description"
          content={user.screen_name + "'/s blog."}
        />
        <meta
          property="og:image"
          content="https://www.ghosttype.app/ghosttype_meta_cover.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Flex align="center">
          <Flex align="flex-end" />
          <Flex align="center" flexGrow="1" justify="center" />
          <Box>
            <SignInButton />
          </Box>
        </Flex>
        <Column>
          <Flex align="row" mt="100px" mb="36px">
            <Box>
              <Heading mb="12px" fontSize="4xl">
                {user.name}
              </Heading>
              <Text fontSize="lg" mb="8px">
                {user.description}
              </Text>
              <a
                target="_blank"
                href={"http://twitter.com/" + user.screen_name}
              >
                <Button variant="outline" pl="8px" pr="12px">
                  <Avatar
                    size="xs"
                    name={user.name}
                    src={user.profile_image_url}
                  />
                  <Text fontSize="lg" ml="8px">
                    Twitter
                  </Text>
                </Button>
              </a>
            </Box>
          </Flex>
        </Column>
        <Divider />
        <Column>
          <Box pt="48px">
            {posts.length === 0 ? (
              <Box>
                <Heading as="h2" mb="8px" fontStyle="bold" fontSize="2xl">
                  This blog has no published posts yet.
                </Heading>
                <Text fontSize="lg" mb="12px">
                  Come back another time! In the mean time, why not make some
                  posts of your own!
                </Text>
                <Link href="/api/login">
                  <Button size="md" variant="outline">
                    <Text fontSize="md">Sign Up/Sign In to Ghosttype</Text>
                  </Button>
                </Link>
              </Box>
            ) : (
              posts.map((post) => (
                <BlogPostPreview
                  key={user.screen_name + post.titleurl}
                  post={post}
                  user={user.screen_name}
                />
              ))
            )}
          </Box>
          <Box height="240px" />

          <NextLink href="/">
            <Link>
              <Text fontWeight="bold">Powered by Ghosttype</Text>
            </Link>
          </NextLink>

          <Box height="48px" />
        </Column>
      </Container>
    </>
  );
}
