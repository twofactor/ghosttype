import Head from "next/head";
import { useRouter } from "next/router";

import { Button, Heading, Text, Box, Divider } from "@chakra-ui/core";
import { useColorMode } from "@chakra-ui/core";

import { Container } from "../../components/container";
import { Column } from "../../components/column";

import BlogPostPreview from "../../components/blog/blogPostPreview";

const posts = {
  posts: [
    {
      title: "What Minecraft Taught Me About Life",
      date: "Today",
      link: "test",
    },
    {
      title: "What Fortnite Taught Me About Life",
      date: "Yesterday",
      link: "swag",
    },
  ],
};

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const { blog } = router.query;

  return (
    <>
      <Container>
        <Column>
          <Heading>{blog}'s Dank Blog</Heading>
          <Text>
            Hi there! Welcome to my dank ass blog. There’s some cool stuff here
            but like, i dunno what else I would put here.
          </Text>
          <Box>
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>
          </Box>
        </Column>
        <Divider />
        <Column>
          {posts.posts.map((post) => (
            <BlogPostPreview post={post} user={blog} />
          ))}
        </Column>
      </Container>
    </>
  );
}
