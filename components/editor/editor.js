import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/head";
import { Button, Heading, Text, Flex, Box, Divider } from "@chakra-ui/core";

import ReactQuill, { Quill } from "react-quill";
import MarkdownShortcuts from "quill-markdown-shortcuts";

import { Container } from "../container";
import { Column } from "../column";
import SignInButton from "../admin/signInButton";

Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const modules = {
  markdownShortcuts: {},
};

const Editor = ({ postdata }) => {
  const [contents, setContents] = useState(postdata.postContents);

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
        <Divider mb="16px" />
      </Column>
      <ReactQuill
        theme="bubble"
        modules={modules}
        value={contents}
        onChange={setContents}
      />
    </Container>
  );
};

export default Editor;
