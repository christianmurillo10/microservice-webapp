import { useMemo, useState } from "react";

const useFilterData = <Model, FiltersData extends Record<string, unknown>>(data: Model[], filterData: FiltersData) => {
  const [filter, setFilter] = useState<FiltersData>(filterData);

  const filteredData = useMemo(() => {
    return data.filter((item: Model) => {
      return Object.entries(filter).every(([key, value]) => {
        if (!value) return true;

        if (typeof value === "string" && typeof item[key as keyof Model] === "string") {
          return (item[key as keyof Model] as string).toLowerCase().includes(value.toLowerCase());
        }

        return item[key as keyof Model] === value;
      });
    });
  }, [data, filter]);

  return { filteredData, filter, setFilter };
};

export default useFilterData;