"use client";

import * as React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TableActionRef } from "@/types/common";

const DialogUserDelete = React.forwardRef<TableActionRef>((_props, ref) => {
  // State
  const { open, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  React.useImperativeHandle(ref, () => ({
    handleOpen(id?: string | number) {
      if (!id) {
        return;
      }

      setDeleteId(Number(id));
      onOpen();
    }
  }));

  const handleDelete = () => {
    // Logic to handle deletion of the user
    console.log(`Deleting user with ID: ${deleteId}`);
    onClose();
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
                <Dialog.Title>Are you sure?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  This action cannot be undone. This will permanently remove your data from our systems.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button variant="subtle" colorPalette="red" onClick={handleDelete}>Delete</Button>
              </Dialog.Footer>
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

export default DialogUserDelete;