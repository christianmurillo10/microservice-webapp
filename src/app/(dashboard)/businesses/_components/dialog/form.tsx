"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { TableActionRef } from "@/types/common";
import { useFetchBusinessesById } from "@/hooks/useFetchBusinessesById";

const DialogBusinessForm = React.forwardRef<TableActionRef>((_props, ref) => {
  // State
  const { open, onOpen, onClose } = useDisclosure();
  const [formId, setFormId] = React.useState<number | null>(null);

  // Hooks
  const { data, isLoading, isError } = useFetchBusinessesById(formId ?? undefined);

  React.useImperativeHandle(ref, () => ({
    handleOpen(id?: string | number) {
      if (id) {
        setFormId(Number(id));
      } else {
        setFormId(Number(null));
      }

      onOpen();
    }
  }));

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onClose}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{formId ? "Update" : "Create"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input placeholder="Name" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Domain</Field.Label>
                  <Input placeholder="Domain" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Timezone</Field.Label>
                  <Input placeholder="Timezone" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Currency</Field.Label>
                  <Input placeholder="Currency" />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default DialogBusinessForm;