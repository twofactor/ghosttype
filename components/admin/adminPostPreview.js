import { Heading, Text, Box } from "@chakra-ui/core";
import { Link } from "@chakra-ui/core";
import NextLink from "next/link";

export default function AdminPostPreview({ post, user }) {
  /* Post Info
    post {
        title:
        date:
        link:
    }
    */
  return (
    <Box mb="36px">
      <Link>
        <Heading as="h2" mb="8px" fontStyle="bold" fontSize="2xl">
          <NextLink href={"/" + user + "/" + post.titleurl + "/edit"}>
            {post.title}
          </NextLink>
        </Heading>
      </Link>
      <Text fontSize="lg">{post.date}</Text>
    </Box>
  );
}
