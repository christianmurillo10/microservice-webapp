"use client";

import { Drawer, DrawerContent } from "@chakra-ui/react";
import Aside from "./aside";

type SidebarLayoutProps = {
  onClose: () => void;
  isOpen?: boolean;
};

const SidebarLayout = ({ isOpen, onClose }: SidebarLayoutProps) => {
  return (
    <>
      <Aside
        onClose={onClose}
        display={{ base: "none", lg: "block" }}
      />
      <Drawer.Root
        open={isOpen}
        placement="start"
        onOpenChange={onClose}
        closeOnEscape={false}
        size="full"
      >
        <DrawerContent overflow="hidden">
          <Aside onClose={onClose} isOpen={isOpen} />
        </DrawerContent>
      </Drawer.Root>
    </>
  );
};

export default SidebarLayout;