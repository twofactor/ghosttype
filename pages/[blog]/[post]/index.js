import Head from "next/head";
import NextLink from "next/link";

import { retrievePostByUserAndTitle } from "../../../lib/faunadb";
import { Button, Heading, Text, Flex, Box, Divider } from "@chakra-ui/core";

import { Container } from "../../../components/layout/container";
import { Column } from "../../../components/layout/column";
import SignInButton from "../../../modules/admin/signInButton";
import NoPost from "../../../modules/blog/nopost";
import { datePrettier } from "../../../lib/dateprettier";

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
        <meta property="og:title" content={postdata.title} />
        <meta
          property="og:description"
          content={"An article by " + postdata.username}
        />
        <meta
          property="og:image"
          content="https://www.ghosttype.app/ghosttype_meta_cover.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
        {!postdata.published && (
          <Box
            padding="16px"
            mt="48px"
            borderRadius="12px"
            border="1px solid"
            borderLeft="8px solid"
            borderColor="green.100"
            backgroundColor="green.50"
          >
            <Heading size="lg" mb="4px">
              This is a preview of a draft post
            </Heading>
            <Text color="green.900">
              This post is not quite public right now. It is, however, avalaible
              from this hidden but sharable link.
            </Text>
          </Box>
        )}

        <Heading mt="48px" mb="4px" fontSize="4xl">
          {postdata.title}
        </Heading>
        <Text fontSize="lg" mb="12px">
          {datePrettier(postdata.date)}
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
