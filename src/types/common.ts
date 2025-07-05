export type TableActionRef = {
  handleOpen: (id: string | number) => void;
};

export type DataListColumn = {
  key: string;
  label: string;
  header: {
    desktop: boolean;
    mobile: boolean;
  };
};