"use client";

import { ButtonGroup, IconButton, Pagination, Stack } from "@chakra-ui/react";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { DataTableColumn } from "@/types/common";
import MobileDataTable from "./MobileDataTable";
import DesktopDataTable from "./DesktopDataTable";

type BaseDataTableProps<T extends object> = {
  columns: DataTableColumn[];
  rows: T[];
};

const BaseDataTable = <T extends object>({ columns, rows }: BaseDataTableProps<T>) => {
  return (
    <Stack>
      <MobileDataTable<T>
        columns={columns}
        rows={rows}
      />
      <DesktopDataTable<T>
        columns={columns}
        rows={rows}
      />
      <Pagination.Root count={rows.length * 5} pageSize={5} page={1}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LucideChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />
          <Pagination.NextTrigger asChild>
            <IconButton>
              <LucideChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};

export default BaseDataTable;