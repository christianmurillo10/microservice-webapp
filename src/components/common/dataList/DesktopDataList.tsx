"use client";

import { Box, Table } from "@chakra-ui/react";
import { DataListColumn } from "@/types/common";
import { getColumnDesktopHeaders } from "@/utils/common";

type DesktopDataListProps<T extends object> = {
  columns: DataListColumn[];
  rows: T[];
};

const DesktopDataList = <T extends object>({ columns, rows }: DesktopDataListProps<T>) => {
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row, rowIndex) => (
              <Table.Row key={rowIndex}>
                {
                  Object.entries(row)
                    .filter(([key]) => comlumnHeaders.map(val => val.key).includes(key))
                    .map(([key, val]) => (
                      <Table.Cell key={key}>{val}</Table.Cell>
                    ))
                }
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Table.ScrollArea>
  );
};

export default DesktopDataList;