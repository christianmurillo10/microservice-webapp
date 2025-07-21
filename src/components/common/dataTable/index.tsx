"use client";

import { Stack } from "@chakra-ui/react";
import { DataTableBaseItem, DataTableColumn, TableActionRef } from "@/types/common";
import MobileDataTable from "./mobile";
import DesktopDataTable from "./desktop";
import PaginationDataTable from "./pagination";

type BaseDataTableProps<T extends DataTableBaseItem> = {
  columns: DataTableColumn[];
  rows: T[];
  rowCount: number;
  page: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  viewRef?: React.RefObject<TableActionRef | null>;
  formRef?: React.RefObject<TableActionRef | null>;
  deleteRef?: React.RefObject<TableActionRef | null>;
};

const BaseDataTable = <T extends DataTableBaseItem>({
  columns,
  rows,
  rowCount,
  page,
  pageSize,
  setPage,
  viewRef,
  formRef,
  deleteRef
}: BaseDataTableProps<T>) => {
  const handleView = (e: React.MouseEvent<HTMLElement>, id: string | number) => {
    e.preventDefault();

    if (id && viewRef && viewRef.current) {
      viewRef.current.handleOpen(id);
    }
  };

  const handleForm = (e: React.MouseEvent<HTMLElement>, id: string | number) => {
    e.preventDefault();

    if (id && formRef && formRef.current) {
      formRef.current.handleOpen(id);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>, id: string | number) => {
    e.preventDefault();

    if (id && deleteRef && deleteRef.current) {
      deleteRef.current.handleOpen(id);
    }
  };

  return (
    <Stack>
      <MobileDataTable<T>
        columns={columns}
        rows={rows}
        viewRef={viewRef}
        formRef={formRef}
        deleteRef={deleteRef}
        handleView={handleView}
        handleForm={handleForm}
        handleDelete={handleDelete}
      />
      <DesktopDataTable<T>
        columns={columns}
        rows={rows}
        viewRef={viewRef}
        formRef={formRef}
        deleteRef={deleteRef}
        handleView={handleView}
        handleForm={handleForm}
        handleDelete={handleDelete}
      />
      <PaginationDataTable
        rowCount={rowCount}
        pageSize={pageSize}
        page={page}
        setPage={setPage}
      />
    </Stack>
  );
};

export default BaseDataTable;