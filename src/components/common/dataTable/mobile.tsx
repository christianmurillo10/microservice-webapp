"use client";

import { Box, Collapsible, Flex, For, HStack, IconButton, Stack, Text, VStack } from "@chakra-ui/react";
import { View, LucideChevronDown, Edit, Trash } from "lucide-react";
import { DataTableBaseItem, DataTableColumn, TableActionRef } from "@/types/common";
import { formattedKey, getColumnMobileHeaders } from "@/utils/common";

type MobileDataListProps<T extends DataTableBaseItem> = {
  columns: DataTableColumn[];
  rows: T[];
  viewRef?: React.RefObject<TableActionRef | null>;
  formRef?: React.RefObject<TableActionRef | null>;
  deleteRef?: React.RefObject<TableActionRef | null>;
  handleView: (e: React.MouseEvent<HTMLElement>, id: string | number) => void;
  handleForm: (e: React.MouseEvent<HTMLElement>, id: string | number) => void;
  handleDelete: (e: React.MouseEvent<HTMLElement>, id: string | number) => void;
};

const MobileDataList = <T extends DataTableBaseItem>({
  columns,
  rows,
  viewRef,
  formRef,
  deleteRef,
  handleView,
  handleForm,
  handleDelete
}: MobileDataListProps<T>) => {
  const comlumnHeaders = getColumnMobileHeaders(columns);
  const columnKey = comlumnHeaders.map(val => val.key);

  return (
    <Box display={{ base: 'block', md: 'none' }}>
      <For each={rows}>
        {(row, rowIndex) => (
          <Collapsible.Root key={rowIndex}>
            <Box borderWidth="1px" borderRadius="md" p={2} mb={2}>
              <Flex justify="space-between" align="center">
                <Box>
                  <For each={columnKey}>
                    {(key, keyIndex) => (
                      <Text key={keyIndex} fontWeight="bold">{String(row[key])}</Text>
                    )}
                  </For>
                </Box>
                <Collapsible.Trigger as={Box}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Collapse button"
                  >
                    <LucideChevronDown size="10" />
                  </IconButton>
                </Collapsible.Trigger>
              </Flex>
              <Collapsible.Content mt={2}>
                <Stack>
                  <HStack justify="center" wrap="wrap" gap="5">
                    {viewRef && (
                      <VStack>
                        <IconButton
                          aria-label="view"
                          variant="subtle"
                          colorPalette="blue"
                          onClick={e => handleView(e, row.id)}
                        >
                          <View />
                        </IconButton>
                        <Text textStyle="sm">View</Text>
                      </VStack>
                    )}
                    {formRef && (
                      <VStack>
                        <IconButton
                          aria-label="update"
                          variant="subtle"
                          colorPalette="orange"
                          onClick={e => handleForm(e, row.id)}
                        >
                          <Edit />
                        </IconButton>
                        <Text textStyle="sm">Update</Text>
                      </VStack>
                    )}
                    {deleteRef && (
                      <VStack>
                        <IconButton
                          aria-label="delete"
                          variant="subtle"
                          colorPalette="red"
                          onClick={e => handleDelete(e, row.id)}
                        >
                          <Trash />
                        </IconButton>
                        <Text textStyle="sm">Delete</Text>
                      </VStack>
                    )}
                  </HStack>
                </Stack>
              </Collapsible.Content>
            </Box>
          </Collapsible.Root>
        )}
      </For>
    </Box>
  );
};

export default MobileDataList;