"use client";

import { Flex, Heading, HStack, IconButton, Menu as Menu, Portal } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { Sun, Moon, MenuIcon, User } from "lucide-react";

type HeaderLayoutProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderLayout = ({ setOpen }: HeaderLayoutProps) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      h="6vh"
      p="1.5"
      bg={useColorModeValue("white", "gray.900")}
      color={useColorModeValue("gray.900", "gray.50")}
    >
      <HStack p={{ base: undefined, lg: "2.5" }} gap={2}>
        <IconButton
          fontSize="18px"
          variant="ghost"
          aria-label="open menu"
          display={{ base: undefined, lg: "none" }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon size="20" />
        </IconButton>
        <Heading as="h1" size={{ base: "md", lg: "2xl" }}>
          Microservice
        </Heading>
      </HStack>
      <HStack gap="1">
        <IconButton
          variant="ghost"
          size="md"
          aria-label="dark and light icon"
          onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
        >
          {colorMode === "dark" ? <Moon size="20" /> : <Sun size="20" />}
        </IconButton>
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              variant="ghost"
              size="md"
              aria-label="user icon"
            >
              <User size="20" />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="account">Account</Menu.Item>
                <Menu.Item value="settings">Settings</Menu.Item>
                <Menu.Item value="logout">Logout</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
    </Flex>
  );
};

export default HeaderLayout;