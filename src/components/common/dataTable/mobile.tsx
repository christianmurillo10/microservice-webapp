"use client";

import { Box, Collapsible, Flex, IconButton, Text } from "@chakra-ui/react";
import { LucideChevronDown } from "lucide-react";
import { DataTableColumn } from "@/types/common";
import { formattedKey, getColumnMobileHeaders } from "@/utils/common";

type MobileDataListProps<T extends object> = {
  columns: DataTableColumn[];
  rows: T[];
};

const MobileDataList = <T extends object>({ columns, rows }: MobileDataListProps<T>) => {
  const comlumnHeaders = getColumnMobileHeaders(columns);

  return (
    <Box display={{ base: 'block', md: 'none' }}>
      {rows.map((row, rowIndex) => (
        <Collapsible.Root key={rowIndex}>
          <Box borderWidth="1px" borderRadius="md" p={2} mb={2}>
            <Flex justify="space-between" align="center">
              <Box>
                {comlumnHeaders.map((column, columnIndex) => (
                  <Text key={columnIndex} fontWeight="bold">{String(row[column.key as keyof T])}</Text>
                ))}
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
              {
                Object.entries(row)
                  .filter(([key]) => !comlumnHeaders.map(val => val.key).includes(key))
                  .map(([key, val], index) => (
                    <Text key={index} fontSize="sm">
                      <strong>{formattedKey(key)}:</strong> {String(val)}
                    </Text>
                  ))
              }
            </Collapsible.Content>
          </Box>
        </Collapsible.Root>
      ))}
    </Box>
  );
};

export default MobileDataList;