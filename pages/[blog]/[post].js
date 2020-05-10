import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

import { Button, Heading, Text } from "@chakra-ui/core";

import { Container } from "../../components/container";
import { Column } from "../../components/column";

export default function BlogPost() {
  return (
    <>
      <Container>
        <Head>{/* <title>{post}</title> */}</Head>
        <Column>
          {/* <Link href={"/" + blog}>
            <Button>Go Back</Button>
          </Link> */}
          {/* <Heading>
            {blog}'s Dank Blog Post {post}
          </Heading> */}
          <Text>
            Hi there! Welcome to my dank ass blog. There’s some cool stuff here
            but like, i dunno what else I would put here.
          </Text>
        </Column>
      </Container>
    </>
  );
}
