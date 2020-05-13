import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/head";
import Router from "next/router";
import {
  Button,
  Heading,
  Text,
  Flex,
  Box,
  Divider,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import { useHotkeys } from "react-hotkeys-hook";
import useThrottledEffect from "use-throttled-effect";
import _ from "lodash";

import ReactQuill, { Quill } from "react-quill";
import MarkdownShortcuts from "quill-markdown-shortcuts";

import { Container } from "../container";
import { Column } from "../column";
import SignInButton from "../admin/signInButton";

Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const modules = {
  markdownShortcuts: {},
};

const NewEditor = ({ postdata, username, post }) => {
  const [contents, setContents] = useState(postdata.postContents);
  const toast = useToast();

  const updateData = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_contents: contents }),
    };
    fetch("/api/posts/" + username + "/" + post + "/", requestOptions);

    toast({
      title: "Saved",
      status: "info",
      duration: 500,
      isClosable: false,
    });
  };

  const updateTitle = async (e) => {
    const newTitle = e;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_title: newTitle }),
    };
    fetch("/api/posts/" + username + "/" + post + "/", requestOptions);

    toast({
      title: "Saved Title",
      status: "info",
      duration: 500,
      isClosable: false,
    });
  };

  const saveAndGoBack = () => {
    console.log("save");
    console.log(contents);
    updateData();
    Router.push("/admin");
  };

  useThrottledEffect(
    () => {
      updateData();
      console.log(contents);
    },
    30000,
    [contents]
  );

  return (
    <Container>
      <Head>
        <title>{postdata.title}</title>
      </Head>
      <Flex align="center">
        <Flex align="flex-end">
          <Button onClick={saveAndGoBack} size="sm" variant="outline">
            <Text fontSize="sm">Save and Go Back</Text>
          </Button>
        </Flex>
        <Flex align="center" flexGrow="1" justify="center" />
        <Box>
          <SignInButton />
        </Box>
      </Flex>
      <Column>
        {/* <Heading  fontSize="4xl">
          {postdata.title}
        </Heading> */}
        <Editable
          mt="96px"
          defaultValue={postdata.title}
          onSubmit={updateTitle}
        >
          <EditablePreview fontSize="4xl" fontWeight="bold" />
          <EditableInput fontSize="4xl" fontWeight="bold" />
        </Editable>
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
