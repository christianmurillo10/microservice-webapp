"use client";

import { usePathname } from "next/navigation";
import { Drawer, DrawerContent } from "@chakra-ui/react";
import Aside from "./aside";

type SidebarLayoutProps = {
  onClose: () => void;
  isOpen?: boolean;
};

const SidebarLayout = ({ onClose, isOpen }: SidebarLayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <Aside
        onClose={onClose}
        display={{ base: "none", lg: "block" }}
        currentPath={pathname}
      />
      <Drawer.Root
        open={isOpen}
        placement="start"
        onOpenChange={onClose}
        closeOnEscape={false}
        size="full"
      >
        <DrawerContent overflow="hidden">
          <Aside onClose={onClose} isOpen={isOpen} currentPath={pathname} />
        </DrawerContent>
      </Drawer.Root>
    </>
  );
};

export default SidebarLayout;