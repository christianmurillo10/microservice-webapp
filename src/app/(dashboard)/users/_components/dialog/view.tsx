"use client";

import * as React from "react";
import {
  Avatar,
  CloseButton,
  DataList,
  Dialog,
  HStack,
  Portal,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TableActionRef } from "@/types/common";
import useFetchUsersById from "@/hooks/useFetchUsersById";

const UserDialogView = React.forwardRef<TableActionRef>((_props, ref) => {
  // State
  const { open, onOpen, onClose } = useDisclosure();
  const [viewId, setViewId] = React.useState<string | null>(null);

  // Hooks
  const { data, isLoading, isError } = useFetchUsersById(viewId ?? undefined);

  React.useImperativeHandle(ref, () => ({
    handleOpen(id?: string | number) {
      if (id) {
        setViewId(String(id));
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
                      <DataList.ItemValue>
                        <HStack>
                          <Avatar.Root size="xs">
                            <Avatar.Fallback name={data?.name} />
                          </Avatar.Root>
                          {data?.name}
                        </HStack>
                      </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Username</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.username}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Email</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.email}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Active?</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.is_active ? "Yes" : "No"}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Logged?</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.is_logged ? "Yes" : "No"}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Last Logged</DataList.ItemLabel>
                      <DataList.ItemValue>{data?.last_logged_at}</DataList.ItemValue>
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

export default UserDialogView;