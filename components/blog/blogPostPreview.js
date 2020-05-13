import { Heading, Text, Box } from "@chakra-ui/core";
import { Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { datePrettier } from "../../lib/dateprettier";

export default function BlogPostPreview({ post, user }) {
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
          <NextLink href={"/" + user + "/" + post.titleurl}>
            {post.title}
          </NextLink>
        </Heading>
      </Link>
      <Text fontSize="lg">{datePrettier(post.date)}</Text>
    </Box>
  );
}
