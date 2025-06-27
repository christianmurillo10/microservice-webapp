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
      p={{ base: "5", lg: "5" }}
      w="full"
      minH="94vh"
      borderRadius="15px"
      bg={useColorModeValue("gray.100", "gray.800")}
      color={useColorModeValue("gray.900", "gray.50")}
    >
      {children}
    </Flex>
  );
};

export default MainLayout;