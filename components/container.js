import React from "react";
import { Flex, Box, useColorMode } from "@chakra-ui/core";

export const Container = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Box
      minHeight="100vh"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};