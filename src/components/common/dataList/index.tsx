"use client";

import { ButtonGroup, IconButton, Pagination, Stack } from "@chakra-ui/react";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { DataListColumn } from "@/types/common";
import MobileDataList from "./MobileDataList";
import DesktopDataList from "./DesktopDataList";

type DataListProps<T extends object> = {
  columns: DataListColumn[];
  rows: T[];
};

const CustomDataList = <T extends object>({ columns, rows }: DataListProps<T>) => {
  return (
    <Stack>
      <MobileDataList<T>
        columns={columns}
        rows={rows}
      />
      <DesktopDataList<T>
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

export default CustomDataList;