"use client";

import NextLink from "next/link";
import { Box, Heading, HStack, IconButton, List, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../../ui/color-mode";
import { ClipboardList, FolderClosed, House, Settings, Users, X } from "lucide-react";

type SidebarListProps = {
  display?: {
    base: string;
    lg: string;
  };
  onClose: () => void;
  isOpen?: boolean;
};

type ListItem = {
  text: string;
  icon: React.ElementType;
  path: string;
};

const listItems: ListItem[] = [
  {
    text: "Home",
    icon: House,
    path: "/dashboard"
  },
  {
    text: "Businesses",
    icon: ClipboardList,
    path: "/dashboard/businesses"
  },
  {
    text: "Roles",
    icon: FolderClosed,
    path: "/dashboard/roles"
  },
  {
    text: "Users",
    icon: Users,
    path: "/dashboard/users"
  },
  {
    text: "Settings",
    icon: Settings,
    path: "/dashboard/settings"
  },
];

const ListElement = ({ text, icon, path }: ListItem) => {
  return (
    <NextLink href={path} passHref>
      <List.Item
        as={HStack}
        gap={0}
        h="10"
        pl="2.5"
        cursor="pointer"
        _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
        rounded="md"
      >
        <List.Indicator as={icon} />
        {text && <Text>{text}</Text>}
      </List.Item>
    </NextLink>
  );
};

const SidebarList = ({ onClose, isOpen, ...rest }: SidebarListProps) => {
  return (
    <Box
      as="aside"
      borderRight="2px solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
      w={{ base: "100%", lg: 60 }}
      top="0"
      pos="fixed"
      h="100%"
      minH="100vh"
      zIndex={99}
      bg={useColorModeValue("white", "gray.900")}
      color={useColorModeValue("gray.900", "gray.50")}
      {...rest}
    >
      <HStack p="2.5" h="10vh" justify="space-between">
        <Heading as="h1" size="md">
          Microservice
        </Heading>
        <IconButton
          onClick={onClose}
          display={isOpen ? "flex" : "none"}
          fontSize="18px"
          variant="ghost"
          aria-label="open menu"
        >
          <X size="20" />
        </IconButton>
      </HStack>
      <Box>
        <List.Root gap={0} p="0.5">
          {listItems.map((item, index) => (
            <ListElement
              key={index}
              icon={item.icon}
              text={item.text}
              path={item.path}
            />
          ))}
        </List.Root>
      </Box>
    </Box>
  );
};

export default SidebarList;