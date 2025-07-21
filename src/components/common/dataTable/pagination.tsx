"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

type PaginationDataTableProps = {
  rowCount: number;
  page: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationDataTable = ({
  rowCount,
  page,
  pageSize,
  setPage,
}: PaginationDataTableProps) => {
  return (
    <Pagination.Root
      count={rowCount}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
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
  );
};

export default PaginationDataTable;