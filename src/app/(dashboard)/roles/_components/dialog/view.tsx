"use client";

import * as React from "react";
import {
  CloseButton,
  DataList,
  Dialog,
  Portal,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TableActionRef } from "@/types/common";
import useFetchRolesById from "@/hooks/useFetchRolesById";

const DialogRoleView = React.forwardRef<TableActionRef>((_props, ref) => {
  // State
  const { open, onOpen, onClose } = useDisclosure();
  const [viewId, setViewId] = React.useState<number | null>(null);

  // Hooks
  const { data, isLoading, isError } = useFetchRolesById(viewId ?? undefined);

  React.useImperativeHandle(ref, () => ({
    handleOpen(id?: string | number) {
      if (id) {
        setViewId(Number(id));
      } else {
        setViewId(null);
      }

      onOpen();
    }
  }));

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
                {isLoading ? (
                  <p>Loading...</p>
                ) : isError ? (
                  <p>Error loading data.</p>
                ) : (
                  <DataList.Root orientation="horizontal">
                    <DataList.Item>
                      <DataList.ItemLabel>ID</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.id}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Name</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.name}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Description</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.description}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Date Created</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.created_at}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Date Modified</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.updated_at}</DataList.ItemValue>
                    </DataList.Item>
                  </DataList.Root>
                )}
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

export default DialogRoleView;