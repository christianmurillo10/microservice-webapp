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
  Textarea,
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
                <Dialog.Title>View Businesses</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="8">
                <DataList.Root orientation="horizontal">
                  <DataList.Item>
                    <DataList.ItemLabel>Status</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <Badge colorPalette="green">Completed</Badge>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Assigned to</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack>
                        <Avatar.Root size="xs">
                          <Avatar.Image src="https://bit.ly/sage-adebayo" />
                          <Avatar.Fallback name="Segun Adebayo" />
                        </Avatar.Root>
                        Segun Adebayo
                      </HStack>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Due date</DataList.ItemLabel>
                    <DataList.ItemValue>12th August 2024</DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>

                <Textarea placeholder="Add a note" mt="8" />
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