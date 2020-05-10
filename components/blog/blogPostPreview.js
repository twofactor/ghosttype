import { Heading, Text, Box } from "@chakra-ui/core";
import { Link as UILink } from "@chakra-ui/core";
import NextLink from "next/link";

export default function BlogPostPreview({ post, user }) {
  /* Post Info
    post {
        title:
        date:
        link:
    }
    */
  return (
    <Box>
      <UILink>
        <NextLink href={user + "/" + post.link}>
          <Heading>{post.title}</Heading>
        </NextLink>
      </UILink>
      <Text>{post.date}</Text>
    </Box>
  );
}
