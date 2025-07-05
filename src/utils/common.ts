import { DataListColumn } from "@/types/common";

export const formattedKey = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/, c => c.toUpperCase());

export const getColumnDesktopHeaders = (columns: DataListColumn[]) => columns.filter(column => column.header.desktop);

export const getColumnMobileHeaders = (columns: DataListColumn[]) => columns.filter(column => column.header.mobile);