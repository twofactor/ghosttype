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
