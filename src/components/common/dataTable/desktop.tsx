"use client";

import { Box, EmptyState, For, HStack, IconButton, Table, VStack } from "@chakra-ui/react";
import { DataTableBaseItem, DataTableColumn, TableActionRef } from "@/types/common";
import { getColumnDesktopHeaders } from "@/utils/common";
import { Edit, SearchX, Trash, View } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

type DesktopDataListProps<T extends DataTableBaseItem> = {
  columns: DataTableColumn[];
  rows: T[];
  viewRef?: React.RefObject<TableActionRef | null>;
  formRef?: React.RefObject<TableActionRef | null>;
  deleteRef?: React.RefObject<TableActionRef | null>;
  handleView: (e: React.MouseEvent<HTMLElement>, id: string | number) => void;
  handleForm: (e: React.MouseEvent<HTMLElement>, id: string | number) => void;
  handleDelete: (e: React.MouseEvent<HTMLElement>, id: string | number) => void;
};

const DesktopDataList = <T extends DataTableBaseItem>({
  columns,
  rows,
  viewRef,
  formRef,
  deleteRef,
  handleView,
  handleForm,
  handleDelete
}: DesktopDataListProps<T>) => {
  const comlumnHeaders = getColumnDesktopHeaders(columns);
  const columnLabel = comlumnHeaders.map(val => val.label);
  const columnKey = comlumnHeaders.map(val => val.key);

  return (
    <Table.ScrollArea
      display={{ base: 'none', md: 'block' }}
      width="100%"
      overflowX="auto"
      maxW="100%"
    >
      <Box minW="800px">
        <Table.Root size="sm" variant="line" interactive>
          <Table.Header>
            <Table.Row>
              <For each={columnLabel}>
                {(label, labelIndex) => (
                  <Table.ColumnHeader key={labelIndex}>{label}</Table.ColumnHeader>
                )}
              </For>
              {viewRef && (
                <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.length > 0 ?
              <For each={rows}>
                {(row, rowIndex) => (
                  <Table.Row key={rowIndex}>
                    <For each={columnKey}>
                      {(val, index) => (
                        <Table.Cell key={index}>{row[val]}</Table.Cell>
                      )}
                    </For>
                    {
                      (viewRef || formRef || deleteRef) && (
                        <Table.Cell>
                          <HStack justify="center" wrap="wrap" gap="1">
                            {viewRef && (
                              <Tooltip content="View">
                                <IconButton
                                  variant="subtle"
                                  colorPalette="blue"
                                  size="2xs"
                                  onClick={e => handleView(e, row.id)}
                                >
                                  <View />
                                </IconButton>
                              </Tooltip>
                            )}
                            {formRef && (
                              <Tooltip content="Update">
                                <IconButton
                                  variant="subtle"
                                  colorPalette="orange"
                                  size="2xs"
                                  onClick={e => handleForm(e, row.id)}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                            )}
                            {deleteRef && (
                              <Tooltip content="Delete">
                                <IconButton
                                  variant="subtle"
                                  colorPalette="red"
                                  size="2xs"
                                  onClick={e => handleDelete(e, row.id)}
                                >
                                  <Trash />
                                </IconButton>
                              </Tooltip>
                            )}
                          </HStack>
                        </Table.Cell>
                      )}
                  </Table.Row>
                )}
              </For>
              :
              <Table.Row>
                <Table.Cell colSpan={comlumnHeaders.length + 1}>
                  <EmptyState.Root>
                    <EmptyState.Content>
                      <EmptyState.Indicator>
                        <SearchX />
                      </EmptyState.Indicator>
                      <VStack textAlign="center">
                        <EmptyState.Title>No results found</EmptyState.Title>
                      </VStack>
                    </EmptyState.Content>
                  </EmptyState.Root>
                </Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table.Root>
      </Box>
    </Table.ScrollArea >
  );
};

export default DesktopDataList;