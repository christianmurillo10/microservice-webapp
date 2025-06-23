"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, ClientOnly, Flex, Heading, HStack, IconButton, Skeleton, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { EarthIcon, Menu, User } from "lucide-react";

export default function Home() {
  const { open, onClose } = useDisclosure();

  const currentsBreakpoint = useBreakpointValue({ lg: "lg" }, { ssr: false });
  if (currentsBreakpoint === "lg" && open) {
    onClose();
  }

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />} >
      <Flex
        as="nav"
        alignItems="center"
        justifyContent={{ base: "space-between", lg: "flex-end" }}
        p="2.5"
        bg={useColorModeValue("gray.50", "gray.800")}
        color={useColorModeValue("gray.900", "gray.50")}
      >
        <HStack gap={2} display={{ base: "flex", lg: "none" }}>
          <IconButton
            fontSize="18px"
            variant="ghost"
            aria-label="open menu"
          >
            <Menu size="20" />
          </IconButton>
          <Heading as="h1" size="md">
            Brand
          </Heading>
        </HStack>
        <HStack gap="1">
          <IconButton
            variant="ghost"
            rounded="full"
            size="md"
            aria-label="earth icon"
          >
            <EarthIcon size="20" />
          </IconButton>
          <IconButton
            rounded="full"
            size="md"
            aria-label="user icon"
          >
            <User size="20" />
          </IconButton>
        </HStack>
      </Flex>
      <HStack
        align="start"
        gap={0}
      // bg={useColorModeValue("gray.50", "gray.800")}
      // color={useColorModeValue("gray.900", "gray.50")}
      >
        <Sidebar isOpen={open} onClose={onClose} />
        <Flex
          as="main"
          w="full"
          minH="90vh"
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
