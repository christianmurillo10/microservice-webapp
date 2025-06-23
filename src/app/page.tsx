"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, ClientOnly, Flex, Heading, HStack, Skeleton, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const { open, onClose, setOpen } = useDisclosure();

  const currentsBreakpoint = useBreakpointValue({ lg: "lg" }, { ssr: true });
  if (currentsBreakpoint === "lg" && open) {
    onClose();
  }

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />} >
      <Header setOpen={setOpen} />
      <HStack
        align="start"
        gap={0}
        bg={useColorModeValue("gray.50", "gray.800")}
        color={useColorModeValue("gray.900", "gray.50")}
      >
        <Sidebar isOpen={open} onClose={onClose} />
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
          <Box textAlign="center">
            <Heading as="h3">Main Heading</Heading>
            <Text>Empty Main Content</Text>
          </Box>
        </Flex>
      </HStack >
    </ ClientOnly>
  );
};
