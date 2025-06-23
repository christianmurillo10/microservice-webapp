"use client";

import { Flex } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Flex
      as="main"
      ml={{ base: 0, lg: "60" }}
      w="full"
      minH="90vh"
      align="center"
      justify="center"
      bg={useColorModeValue("white", "gray.900")}
      color={useColorModeValue("gray.900", "gray.50")}
    >
      {children}
    </Flex>
  );
};

export default MainLayout;