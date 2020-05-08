import { Heading, Text, Box } from "@chakra-ui/core";
import { Link as UILink } from "@chakra-ui/core";
import Link from "next/Link";

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
        <Link href={user + "/" + post.link}>
          <Heading>{post.title}</Heading>
        </Link>
      </UILink>
      <Text>{post.date}</Text>
    </Box>
  );
}
