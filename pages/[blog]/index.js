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

  return {
    props: { posts: posts, user: user },
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
      <Container>
        <Flex align="center">
          <Flex align="flex-end" />
          <Flex align="center" flexGrow="1" justify="center" />
          <Box>
            <SignInButton />
          </Box>
        </Flex>
        <Column>
          <Box mt="100px" mb="36px">
            <Heading mb="12px" fontSize="4xl">
              {user.name}
            </Heading>
            <Text fontSize="lg">{user.description}</Text>
          </Box>
        </Column>
        <Divider />
        <Column>
          <Box pt="48px">
            {posts.map((post) => (
              <BlogPostPreview post={post} user={user.screen_name} />
            ))}
          </Box>
          <Box height="200px" />
        </Column>
      </Container>
    </>
  );
}
