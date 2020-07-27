import React from "react";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import {
  Button,
  Heading,
  Link,
  Badge,
  Text,
  Flex,
  Box,
  Divider,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import useThrottledEffect from "use-throttled-effect";
import _ from "lodash";

import ReactQuill, { Quill } from "react-quill";
import MarkdownShortcuts from "quill-markdown-shortcuts";

import { Container } from "../../components/layout/container";
import { Column } from "../../components/layout/column";
import { datePrettier } from "../../lib/dateprettier";

Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const modules = {
  markdownShortcuts: {},
};

//hack fake component that enables using the components own props
const EditorOnLoadHack = ({ onRequestEdit }) => {
  useEffect(() => {
    console.log("ayy lmao");
    onRequestEdit();
  }, []);
  return <></>;
};

const Editor = ({ postdata, username, post }) => {
  const [contents, setContents] = useState(postdata.postContents);
  const [titleurl, setTitleurl] = useState(post);
  const [ispublished, setIspublished] = useState(postdata.published);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const editorRef = useRef(null);
  const titleRef = useRef(null);

  const updateData = async () => {
    if (titleurl !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_contents: contents,
          ispublished: ispublished,
        }),
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

  const flipPublish = async function () {
    if (titleurl !== "") {
      updateData();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          changepublish: true,
          ispublished: ispublished,
        }),
      };
      const flipPublishResponse = await fetch(
        "/api/posts/" + username + "/" + titleurl + "/",
        requestOptions
      );
      setIspublished(!ispublished);

      if (!ispublished) {
        toast({
          title: "Post Published",
          status: "info",
          duration: 2000,
          isClosable: false,
        });
      } else {
        toast({
          title: "Post Unpublished",
          status: "info",
          duration: 2000,
          isClosable: false,
        });
      }
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
    console.log("title ref", titleRef.current);
  }, []);

  const updateTitle = async (e) => {
    //update existing title
    if (e !== "") {
      try {
        if (titleurl !== "") {
          const newTitle = e;
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              post_title: newTitle,
              ispublished: ispublished,
            }),
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

        editorRef.current.getEditor().focus();
      } catch (e) {
        toast({
          title: `Network Error`,
          status: "error",
          duration: 500,
          isClosable: false,
        });
      }
    }
  };

  const deletePost = async function () {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const deleteResponse = await fetch(
      "/api/posts/" + username + "/" + titleurl + "/",
      requestOptions
    );
    Router.push("/admin");
  };

  const saveAndGoBack = () => {
    updateData();
    Router.push("/admin");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are You Sure You Want To Delete Post?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This gets rid of your wonderful post forever and there is no way for
            you to get it back.
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button onClick={deletePost} variantColor="red" mr={3}>
              Delete Post permanently
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container>
        <Flex align="center">
          <Flex align="flex-end">
            <Button onClick={saveAndGoBack} size="sm" variant="outline">
              <Text fontSize="sm">Save and Go Back</Text>
            </Button>
          </Flex>
          <Flex align="center" flexGrow="1" justify="center" />
          <Box>
            {titleurl !== "" ? (
              ispublished ? (
                <>
                  <Link onClick={onOpen} fontSize="sm" mr="16px">
                    Delete Post
                  </Link>
                  <Link
                    target="_blank"
                    href={"/" + username + "/" + titleurl + "/"}
                    fontSize="sm"
                    mr="16px"
                  >
                    View Post
                  </Link>
                  <Button onClick={flipPublish} size="sm" variant="outline">
                    <Text fontSize="sm">Unpublish Post</Text>
                  </Button>
                </>
              ) : (
                <>
                  <Link onClick={onOpen} fontSize="sm" mr="16px">
                    Delete Post
                  </Link>
                  <Link
                    target="_blank"
                    href={"/" + username + "/" + titleurl + "/"}
                    fontSize="sm"
                    mr="16px"
                  >
                    Preview Post
                  </Link>
                  <Button onClick={flipPublish} size="sm" variant="outline">
                    <Text fontSize="sm">Publish Post</Text>
                  </Button>
                </>
              )
            ) : (
              <span />
            )}
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
            {(props) => {
              useEffect(() => props.onRequestEdit(), []);

              return (
                <>
                  <EditablePreview fontSize="4xl" fontWeight="bold" />
                  <EditableInput fontSize="4xl" fontWeight="bold" />
                  {/* {!postdata.title && (
                    <EditorOnLoadHack onRequestEdit={props.onRequestEdit} />
                  )} */}
                </>
              );
            }}
          </Editable>
          <Flex algin="row" justify="left">
            <Text fontSize="lg" mb="12px">
              {datePrettier(postdata.date)}
            </Text>
            {ispublished ? (
              <Badge ml="8px" mt="6px" height="18px">
                Published
              </Badge>
            ) : (
              <Badge ml="8px" mt="6px" height="18px">
                Draft
              </Badge>
            )}
          </Flex>
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
    </>
  );
};

export default Editor;
