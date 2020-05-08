import React from "react";
import { Flex, useColorMode } from "@chakra-ui/core";

export const Column = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
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
