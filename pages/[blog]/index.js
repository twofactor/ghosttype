import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { retrievePostsByUser } from "../../lib/faunadb";

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
  const { blog } = context.params;
  const posts = await retrievePostsByUser(blog);

  return {
    props: { posts },
  };
}

export default function BlogPosts({ posts }) {
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
              {blog}'s Dank Blog
            </Heading>
            <Text fontSize="lg">
              Hi there! Welcome to my dank ass blog. There’s some cool stuff
              here but like, i dunno what else I would put here.
            </Text>
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
