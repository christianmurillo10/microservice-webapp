export type TableActionRef = {
  handleOpen: (id: string | number) => void;
};

export type DataTableColumn = {
  key: string;
  label: string;
  header: {
    desktop: boolean;
    mobile: boolean;
  };
};