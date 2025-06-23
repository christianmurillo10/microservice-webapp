import { Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { EarthIcon, Menu, User } from "lucide-react";

type HeaderProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ setOpen }: HeaderProps) => {
  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      h="10vh"
      p="2.5"
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
  );
};