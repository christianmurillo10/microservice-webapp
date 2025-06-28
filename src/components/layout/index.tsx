"use client";

import HeaderLayout from "@/components/layout/header";
import MainLayout from "@/components/layout/main";
import SidebarLayout from "@/components/layout/sidebar";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, ClientOnly, HStack, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { open, onClose, setOpen } = useDisclosure();

  const currentsBreakpoint = useBreakpointValue({ lg: "lg" }, { ssr: true });
  if (currentsBreakpoint === "lg" && open) {
    onClose();
  };

  return (
    <ClientOnly>
      <Box
        minH="100vh"
        bg={useColorModeValue("gray.100", "gray.800")}
        color={useColorModeValue("gray.900", "gray.50")}
      >
        <HeaderLayout setOpen={setOpen} />
        <HStack
          align="start"
          gap={0}
        >
          <SidebarLayout isOpen={open} onClose={onClose} />
          <MainLayout>{children}</MainLayout>
        </HStack >
      </Box >
    </ClientOnly>
  );
};

export default Layout;