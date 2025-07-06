export type TableActionRef = {
  handleOpen: (id: string | number) => void;
};

export type DataTableBaseItem = {
  id: string | number;
};

export type DataTableColumn = {
  key: string;
  label: string;
  header: {
    desktop: boolean;
    mobile: boolean;
  };
};