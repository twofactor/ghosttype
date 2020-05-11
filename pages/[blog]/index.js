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

import BlogPostPreview from "../../components/blog/blogPostPreview";

export async function getServerSideProps(context) {
  try {
    const { blog } = context.params;
    const posts = await retrievePostsByUser(blog);

    const user = await retrieveUserByUsername(blog);

    return {
      props: { posts: posts, user: user },
    };
  } catch (errror) {
    return {
      props: { posts: "no", user: "no" },
    };
  }
}

export default function BlogPosts({ posts, user }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const { blog } = router.query;

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
              <BlogPostPreview post={post} user={blog} />
            ))}
          </Box>
          <Box height="200px" />
        </Column>
      </Container>
    </>
  );
}
