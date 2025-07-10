"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { Avatar, Box, Flex, For, HStack, IconButton, List, Separator, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { UserCog, BriefcaseBusiness, LayoutDashboard, Users, X, ChevronRightIcon, ChevronDownIcon } from "lucide-react";
import { useColorModeValue } from "../../ui/color-mode";

type AsideProps = {
  display?: {
    base: string;
    lg: string;
  };
  onClose: () => void;
  isOpen?: boolean;
  currentPath: string;
};

type MenuListProps = {
  listItems: ListItem[];
  currentPath: string;
};

type MenuListItemProps = {
  isActive: boolean;
  hasChildren?: boolean;
  open: boolean;
  onToggle: () => void;
  text: string;
  icon?: React.ElementType;
};

type RecursiveMenuListItemProps = ListItem & {
  currentPath?: string;
};

type ListItem = {
  text: string;
  icon?: React.ElementType;
  path?: string;
  children?: ListItem[];
};

const listItems: ListItem[] = [
  {
    text: "Dashboard",
    icon: LayoutDashboard,
    path: "/"
  },
  {
    text: "Businesses",
    icon: BriefcaseBusiness,
    path: "/businesses"
  },
  {
    text: "Roles",
    icon: UserCog,
    path: "/roles"
  },
  {
    text: "Users",
    icon: Users,
    children: [
      {
        text: "Manage",
        path: "/users",
      }
    ]
  },
];

const MenuList = ({ listItems, currentPath }: MenuListProps) => (
  <List.Root gap={1}>
    <For each={listItems}>
      {(item, index) => (
        <RecursiveListItem
          key={index}
          icon={item.icon}
          text={item.text}
          children={item.children}
          path={item.path}
          currentPath={currentPath}
        />
      )}
    </For>
  </List.Root>
);

const MenuListItem = ({ isActive, hasChildren, open, onToggle, text, icon }: MenuListItemProps) => (
  <List.Item gap={0}>
    <Flex
      alignItems="center"
      justifyContent="space-between"
      h="10"
      pl={icon ? "2.5" : "9"}
      cursor="pointer"
      bg={isActive ? "blue.500" : "transparent"}
      color={isActive ? "white" : undefined}
      _hover={{ bg: isActive ? "blue.600" : useColorModeValue("gray.50", "gray.700") }}
      rounded="md"
      onClick={hasChildren ? onToggle : undefined}
    >
      <Box>
        <List.Indicator as={icon} />
        {text}
      </Box>
      {hasChildren && (<List.Indicator as={open ? ChevronDownIcon : ChevronRightIcon} />)}
    </Flex>
  </List.Item>
);

const RecursiveListItem = ({ icon, text, children, path, currentPath }: RecursiveMenuListItemProps) => {
  const { open, onToggle, setOpen } = useDisclosure();
  const isActive = currentPath === path;
  const hasChildren = children && children.length > 0;

  useEffect(() => {
    if (hasChildren) {
      const activeChildren = children.some(child => child.path === currentPath);
      if (activeChildren) setOpen(true);
    }
  }, []);

  return (
    <>
      {path
        ?
        <NextLink href={path} passHref>
          <MenuListItem
            isActive={isActive}
            hasChildren={hasChildren}
            open={open}
            onToggle={onToggle}
            text={text}
            icon={icon}
          />
        </NextLink>
        :
        <MenuListItem
          isActive={isActive}
          hasChildren={hasChildren}
          open={open}
          onToggle={onToggle}
          text={text}
          icon={icon}
        />
      }

      {hasChildren && open &&
        <List.Root gap={0}>
          {children &&
            <For each={children}>
              {(child, index) => (
                <RecursiveListItem
                  key={index}
                  icon={child.icon}
                  text={child.text}
                  children={child.children}
                  path={child.path}
                  currentPath={currentPath}
                />
              )}
            </For>
          }
        </List.Root>
      }
    </>
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
      <HStack p="2.5" my="2.5" justify="space-between">
        <HStack gap="2">
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
      <Separator m="2" />
      <Box p="2.5">
        <MenuList listItems={listItems} currentPath={currentPath} />
      </Box>
    </Box>
  );
};

export default Aside;