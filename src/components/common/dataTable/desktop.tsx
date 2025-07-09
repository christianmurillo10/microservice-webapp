"use client";

import { Box, EmptyState, HStack, IconButton, Table, VStack } from "@chakra-ui/react";
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
              {comlumnHeaders.map((column, columnIndex) => (
                <Table.ColumnHeader key={columnIndex}>{column.label}</Table.ColumnHeader>
              ))}
              {
                viewRef ?
                  <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
                  : null
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.length > 0 ?
              rows.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {
                    Object.entries(row)
                      .filter(([key]) => comlumnHeaders.map(val => val.key).includes(key))
                      .map(([key, val]) => (
                        <Table.Cell key={key}>{val}</Table.Cell>
                      ))
                  }
                  {
                    viewRef || formRef || deleteRef ?
                      <Table.Cell>
                        <HStack justify="center" wrap="wrap" gap="1">
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
                        </HStack>
                      </Table.Cell>
                      : null
                  }
                </Table.Row>
              ))
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