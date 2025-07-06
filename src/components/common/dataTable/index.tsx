"use client";

import { ButtonGroup, IconButton, Pagination, Stack } from "@chakra-ui/react";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { DataTableBaseItem, DataTableColumn, TableActionRef } from "@/types/common";
import MobileDataTable from "./mobile";
import DesktopDataTable from "./desktop";

type BaseDataTableProps<T extends DataTableBaseItem> = {
  columns: DataTableColumn[];
  rows: T[];
  viewRef?: React.RefObject<TableActionRef | null>;
};

const BaseDataTable = <T extends DataTableBaseItem>({
  columns,
  rows,
  viewRef
}: BaseDataTableProps<T>) => {
  const handleView = (e: React.MouseEvent<HTMLElement>, id: string | number) => {
    e.preventDefault();

    if (id && viewRef && viewRef.current) {
      viewRef.current.handleOpen(id);
    }
  };

  return (
    <Stack>
      <MobileDataTable<T>
        columns={columns}
        rows={rows}
        viewRef={viewRef}
        handleView={handleView}
      />
      <DesktopDataTable<T>
        columns={columns}
        rows={rows}
        viewRef={viewRef}
        handleView={handleView}
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