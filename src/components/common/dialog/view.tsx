"use client";

import * as React from "react";
import {
  Avatar,
  Badge,
  CloseButton,
  DataList,
  Dialog,
  HStack,
  Portal,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TableActionRef } from "@/types/common";

const BaseDialogView = React.forwardRef<TableActionRef>((_props, ref) => {
  const { open, onClose, setOpen } = useDisclosure();

  React.useImperativeHandle(ref, () => ({
    handleOpen(id: string | number) {
      handleOpen(Number(id));
    }
  }));

  const handleOpen = (id: number) => {
    setOpen(true);
  };

  return (
    <VStack alignItems="start">
      <Dialog.Root
        open={open}
        onOpenChange={onClose}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>View</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="8">
                <DataList.Root orientation="horizontal">
                  <DataList.Item>
                    <DataList.ItemLabel>Name</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack>
                        <Avatar.Root size="xs">
                          <Avatar.Fallback name="Company 1" />
                        </Avatar.Root>
                        Company 1
                      </HStack>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Domain</DataList.ItemLabel>
                    <DataList.ItemValue>www.domain1.com</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>API Key</DataList.ItemLabel>
                    <DataList.ItemValue>key-domain1-1234567890</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Timezone</DataList.ItemLabel>
                    <DataList.ItemValue>Asia/Hong Kong</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Currency</DataList.ItemLabel>
                    <DataList.ItemValue>PHP</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Date Created</DataList.ItemLabel>
                    <DataList.ItemValue>12th June 2025</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Date Modified</DataList.ItemLabel>
                    <DataList.ItemValue>12th June 2025</DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
});

export default BaseDialogView;