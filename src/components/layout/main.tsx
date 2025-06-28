"use client";

import { Flex } from "@chakra-ui/react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Flex
      as="main"
      ml={{ base: 0, lg: "60" }}
      p="5"
      w="full"
      mt="16"
      borderRadius="15px"
    >
      {children}
    </Flex>
  );
};

export default MainLayout;