import { DataTableColumn } from "@/types/common";

export const formattedKey = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/, c => c.toUpperCase());

export const getColumnDesktopHeaders = (columns: DataTableColumn[]) => columns.filter(column => column.header.desktop);

export const getColumnMobileHeaders = (columns: DataTableColumn[]) => columns.filter(column => column.header.mobile);