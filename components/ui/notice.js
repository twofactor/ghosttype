import React from "react";
import { Flex, Box, Heading, Text } from "@chakra-ui/core";

export const Notice = (props) => {
  return (
    <Box
      padding="16px"
      borderRadius="12px"
      border="1px solid"
      borderLeft="8px solid"
      borderColor="blue.100"
      backgroundColor="blue.50"
    >
      <Heading size="lg" mb="4px">
        Ghosttyped is now Blogmachine!
      </Heading>
      <Text color="blue.900">
        Your blogs and our site now live at a new URL, blogmachine.app.
      </Text>
    </Box>
  );
};
