"use client";

import HeaderLayout from "@/components/layout/header";
import MainLayout from "@/components/layout/main";
import SidebarLayout from "@/components/layout/sidebar";
import { useColorModeValue } from "@/components/ui/color-mode";
import { ClientOnly, HStack, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

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
      <HeaderLayout setOpen={setOpen} />
      <HStack
        align="start"
        gap={0}
        bg={useColorModeValue("white", "gray.900")}
        color={useColorModeValue("gray.900", "gray.50")}
      >
        <SidebarLayout isOpen={open} onClose={onClose} />
        <MainLayout>{children}</MainLayout>
      </HStack >
    </ClientOnly>
  );
};

export default Layout;