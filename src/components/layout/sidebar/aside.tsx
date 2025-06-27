"use client";

import NextLink from "next/link";
import { Avatar, Box, Heading, HStack, IconButton, List, Separator, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../../ui/color-mode";
import { UserCog, BriefcaseBusiness, LayoutDashboard, Users, X } from "lucide-react";

type AsideProps = {
  display?: {
    base: string;
    lg: string;
  };
  onClose: () => void;
  isOpen?: boolean;
  currentPath?: string;
};

type ListItem = {
  text: string;
  icon: React.ElementType;
  path: string;
  currentPath?: string;
};

const listItems: ListItem[] = [
  {
    text: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  },
  {
    text: "Businesses",
    icon: BriefcaseBusiness,
    path: "/dashboard/businesses"
  },
  {
    text: "Roles",
    icon: UserCog,
    path: "/dashboard/roles"
  },
  {
    text: "Users",
    icon: Users,
    path: "/dashboard/users"
  },
];

const ListElement = ({ text, icon, path, currentPath }: ListItem) => {
  const isActive = currentPath === path;

  return (
    <NextLink href={path} passHref>
      <List.Item
        as={HStack}
        gap={0}
        h="10"
        pl="2.5"
        cursor="pointer"
        bg={isActive ? "blue.500" : "transparent"}
        color={isActive ? "white" : undefined}
        _hover={{ bg: isActive ? "blue.600" : useColorModeValue("gray.50", "gray.700") }}
        rounded="md"
      >
        <List.Indicator as={icon} />
        {text && <Text>{text}</Text>}
      </List.Item>
    </NextLink>
  );
};

const Aside = ({ onClose, isOpen, currentPath, ...rest }: AsideProps) => {
  return (
    <Box
      as="aside"
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
      <HStack p="2.5" h="6vh" justify="space-between">
        <Heading as="h1" size="2xl">
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
      <HStack p="2.5" gap="2">
        <Avatar.Root>
          <Avatar.Fallback name="Christian Murillo" />
        </Avatar.Root>
        <Stack gap="0">
          <Text fontWeight="medium">Christian Murillo</Text>
          <Text color="fg.muted" textStyle="sm">
            Welcome!
          </Text>
        </Stack>
      </HStack>
      <Separator m="2" />
      <Box p="2.5">
        <List.Root gap={1}>
          {listItems.map((item, index) => (
            <ListElement
              key={index}
              icon={item.icon}
              text={item.text}
              path={item.path}
              currentPath={currentPath}
            />
          ))}
        </List.Root>
      </Box>
    </Box>
  );
};

export default Aside;