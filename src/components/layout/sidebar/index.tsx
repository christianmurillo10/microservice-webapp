"use client";

import { Drawer, DrawerContent } from "@chakra-ui/react";
import { SidebarList } from "./sidebar-list";

type SidebarProps = {
  onClose: () => void;
  isOpen?: boolean;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      <SidebarList
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
          <SidebarList onClose={onClose} isOpen={isOpen} />
        </DrawerContent>
      </Drawer.Root>
    </>
  );
};