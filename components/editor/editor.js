import React from "react";
import { useState, useRef, useEffect } from "react";
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

const Editor = ({ postdata, username, post }) => {
  const [contents, setContents] = useState(postdata.postContents);
  const [titleurl, setTitleurl] = useState(post);
  const toast = useToast();
  const editorRef = useRef(null);
  const titleRef = useRef(null);

  const updateData = async () => {
    if (titleurl !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_contents: contents }),
      };
      fetch("/api/posts/" + username + "/" + titleurl + "/", requestOptions);

      toast({
        title: "Saved",
        status: "info",
        duration: 500,
        isClosable: false,
      });
    } else {
      console.log("no data to save");
    }
  };

  useThrottledEffect(
    () => {
      updateData();
      console.log(contents);
    },
    30000,
    [contents]
  );

  useEffect(() => {
    titleRef.current.focus();
    console.log(titleRef.current);
  }, []);

  const updateTitle = async (e) => {
    //update existing title
    try {
      if (titleurl !== "") {
        const newTitle = e;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_title: newTitle }),
        };
        const updateTitleResponse = await fetch(
          "/api/posts/" + username + "/" + titleurl + "/",
          requestOptions
        );

        const updateTitleData = await updateTitleResponse.json();

        if (updateTitleData.titleurl !== titleurl) {
          console.log("new title!");
          setTitleurl(updateTitleData.titleurl);
        }

        if (!updateTitleData.error) {
          toast({
            title: "Saved Title",
            status: "info",
            duration: 500,
            isClosable: false,
          });
        } else {
          toast({
            title: "Error",
            status: "error",
            duration: 500,
            isClosable: false,
          });
        }
      } else {
        //create new post
        const newTitle = e;

        //this is disgusting
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_title: newTitle, new: true }),
        };

        const updateTitleResponse = await fetch(
          "/api/posts/" + username + "/" + "newpost" + "/",
          requestOptions
        );

        const newPostData = await updateTitleResponse.json();

        if (!newPostData.error) {
          setTitleurl(newPostData.titleurl);
          toast({
            title: `Created New Post ${newPostData.title}`,
            status: "info",
            duration: 500,
            isClosable: false,
          });
        } else {
          toast({
            title: `BAD BAD BAD`,
            status: "error",
            duration: 500,
            isClosable: false,
          });
        }
      }

      setTimeout(() => {
        editorRef.current.getEditor().focus();
      }, 1);
    } catch (e) {
      console.log("error?");
      console.log(e);
      toast({
        title: `Network Error`,
        status: "error",
        duration: 500,
        isClosable: false,
      });
    }
  };

  const saveAndGoBack = () => {
    console.log("save");
    console.log(contents);
    updateData();
    Router.push("/admin");
  };

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
          <Button onClick={saveAndGoBack} size="sm" variant="outline">
            <Text fontSize="sm">Save and Go Back</Text>
          </Button>
        </Box>
      </Flex>
      <Column>
        {/* <Heading  fontSize="4xl">
          {postdata.title}
        </Heading> */}
        <Editable
          mt="96px"
          defaultValue={postdata.title}
          placeholder="Give me a good title..."
          onSubmit={updateTitle}
          ref={titleRef}
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
        ref={editorRef}
        theme="bubble"
        modules={modules}
        value={contents}
        onChange={setContents}
      />
    </Container>
  );
};

export default Editor;
