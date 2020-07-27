import { Heading, Flex, Text, Box, Badge, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { datePrettier } from "../../lib/dateprettier";

export default function AdminPostPreview({ post, user, published }) {
  /* Post Info
    post {
        title:
        date:
        link:
    } 
    */
  return (
    <Box mb="36px">
      <Heading as="h2" mb="8px" fontStyle="bold" fontSize="2xl">
        <NextLink href={"/" + user + "/" + post.titleurl + "/edit"}>
          {post.title}
        </NextLink>
      </Heading>
      <Flex algin="row" justify="left">
        <Text fontSize="lg" mb="12px">
          {datePrettier(post.date)}
        </Text>
        {published ? (
          <Badge ml="8px" mt="6px" height="18px">
            Published
          </Badge>
        ) : (
          <Badge ml="8px" mt="6px" height="18px">
            Draft
          </Badge>
        )}
      </Flex>
    </Box>
  );
}
