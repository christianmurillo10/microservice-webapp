"use client";

import { Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { Sun, Moon, Menu, User } from "lucide-react";

type HeaderLayoutProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderLayout = ({ setOpen }: HeaderLayoutProps) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      h="6vh"
      p="1.5"
      bg={useColorModeValue("gray.50", "gray.800")}
      color={useColorModeValue("gray.900", "gray.50")}
    >
      <HStack gap={2} display={{ base: "flex", lg: "none" }}>
        <IconButton
          fontSize="18px"
          variant="ghost"
          aria-label="open menu"
          onClick={() => setOpen(true)}
        >
          <Menu size="20" />
        </IconButton>
        <Heading as="h1" size="md">
          Microservice
        </Heading>
      </HStack>
      <HStack gap="1">
        <IconButton
          variant="ghost"
          rounded="full"
          size="md"
          aria-label="dark and light icon"
          onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
        >
          {colorMode === "dark" ? <Moon size="20" /> : <Sun size="20" />}
        </IconButton>
        <IconButton
          variant="ghost"
          rounded="full"
          size="md"
          aria-label="user icon"
        >
          <User size="20" />
        </IconButton>
      </HStack>
    </Flex>
  );
};

export default HeaderLayout;