import React from "react";
import { Flex, useColorMode } from "@chakra-ui/core";

export const Column = (props) => {
  return (
    <Flex
      width="100%"
      maxWidth="660px"
      direction="column"
      alignItems="left"
      margin="auto"
      {...props}
    />
  );
};
