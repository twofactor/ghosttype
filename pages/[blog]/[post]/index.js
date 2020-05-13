import Head from "next/head";
import NextLink from "next/link";

import { retrievePostByUserAndTitle } from "../../../lib/faunadb";
import { Button, Heading, Text, Flex, Box, Divider } from "@chakra-ui/core";

import { Container } from "../../../components/container";
import { Column } from "../../../components/column";
import SignInButton from "../../../components/admin/signInButton";
import NoPost from "../../../components/blog/nopost";

export async function getServerSideProps(context) {
  let { blog, post } = context.params;
  const postdata = await retrievePostByUserAndTitle(blog, post);

  if (typeof postdata === "undefined") {
    return {
      props: { postdata: "" },
    };
  }

  return {
    props: { postdata },
  };
}

export default function BlogPost({ postdata }) {
  if (postdata === "") {
    return (
      <Container>
        <Column>
          <NoPost />
        </Column>
      </Container>
    );
  }
  return (
    <Container>
      <Head>
        <title>{postdata.title}</title>
      </Head>
      <Flex align="center">
        <Flex align="flex-end">
          <NextLink href={"/" + postdata.username}>
            <Button size="sm" variant="outline">
              <Text fontSize="sm">Go Back</Text>
            </Button>
          </NextLink>
        </Flex>
        <Flex align="center" flexGrow="1" justify="center" />
        <Box>
          <SignInButton />
        </Box>
      </Flex>
      <Column>
        <Heading mt="100px" mb="4px" fontSize="4xl">
          {postdata.title}
        </Heading>
        <Text fontSize="lg" mb="12px">
          {postdata.date}
        </Text>
        <Divider mb="28px" />
        <div
          className="blogpostcontents"
          dangerouslySetInnerHTML={{ __html: postdata.postContents }}
        />
        <Box height="48px" />
      </Column>
    </Container>
  );
}
