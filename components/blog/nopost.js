import { Heading, Text, Box } from "@chakra-ui/core";
import { Link, Image, Button } from "@chakra-ui/core";
import NextLink from "next/link";

export default function NoPost() {
  return (
    <Box>
      <NextLink href="/">
        <Image width="100%" mb="12px" src="/obama.png" />
      </NextLink>
      <NextLink href="/">
        <Button width="100%" pl="6px" pr="6px" variant="outline" size="lg">
          <Text fontSize="lg">Go Back Home</Text>
        </Button>
      </NextLink>
    </Box>
  );
}
