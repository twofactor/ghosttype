import Head from "next/head";
import Router from "next/router";
import {
  retrieveUserByUserID,
  retrievePostsByUser,
  createNewUser,
} from "../lib/faunadb";
import auth0 from "../lib/auth0";

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
import AdminPostPreview from "../components/admin/adminPostPreview";
import { datePrettier } from "../lib/dateprettier";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const user = await auth0.getSession(context.req);

  if (!user) {
    return {
      props: {
        user: "",
      },
    };
  }

  //ugh this is gross
  const userName = await retrieveUserByUserID(user.user.sub);

  let userHolder = userName;

  if (!userName) {
    const newUser = await createNewUser(user.user.sub);
    userHolder = newUser;
  }

  const screenname = userHolder.screen_name;
  const posts = await retrievePostsByUser(screenname);

  user.user.screenname = screenname;

  if (user && screenname && !posts[0]) {
    return {
      props: { user: user.user, posts: null, screenname: screenname },
    };
  }

  const postsSorted = posts.sort((A, B) => {
    return A.date > B.date ? -1 : 1;
  });
  return {
    props: { user: user.user, posts: postsSorted, screenname: screenname },
  };
}

export default function Home({ user, posts }) {
  useEffect(() => {
    if (user === "") {
      Router.push("/");
    }
  });

  return (
    <>
      <Head>
        <title>My Posts</title>
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
          <Flex align="flex-end" />
          <Flex align="center" flexGrow="1" justify="center" />
          <Box>
            <span />
          </Box>
        </Flex>
        <Column>
          <Box mt="100px" mb="24px">
            <Heading mb="12px" fontSize="4xl">
              Welcome, {user.nickname}
            </Heading>
            <Text fontSize="lg" mb="24px">
              Here you can see all the posts you've written. You can click on
              one to edit it too! You can also log out of your account. Very
              cool.
            </Text>
            <Box>
              <Link href="/newpost">
                <Button size="md" variant="outline">
                  <Text fontSize="md">Create Post</Text>
                </Button>
              </Link>
              <a target="_blank" href={"/" + user.screenname + "/"}>
                <Button variant="outline" size="md" ml="12px">
                  <Text fontSize="md">View My Blog</Text>
                </Button>
              </a>
              <Link href="/api/logout">
                <Button variant="outline" size="md" ml="12px">
                  <Text fontSize="md">Log Out</Text>
                </Button>
              </Link>
            </Box>
          </Box>
        </Column>
        <Divider />
        <Column>
          <Box pt="24px" />
          {posts ? (
            posts.map((post) => (
              <AdminPostPreview
                key={post.date + user.screenname + post.title}
                post={post}
                user={user.screenname}
                published={post.published}
              />
            ))
          ) : (
            <Box>
              <Link>
                <Heading as="h2" mb="8px" fontStyle="bold" fontSize="2xl">
                  You have no posts yet!
                </Heading>
              </Link>
              <Text fontSize="lg" mb="12px">
                Why not write something beautiful for all the world to see :)
              </Text>
              <Link href="/newpost">
                <Button size="md" variant="outline">
                  <Text fontSize="md">Create Post</Text>
                </Button>
              </Link>
            </Box>
          )}
          <Box height="200px" />
        </Column>
      </Container>
    </>
  );
}
