import { useMemo, useState } from "react";

const useFilterData = <Model, SearchFilters extends Record<string, unknown>>(data: Model[], defaultSearchData: SearchFilters) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultSearchData);

  const filteredData = useMemo(() => {
    return data.filter((item: Model) => {
      return Object.entries(searchFilters).every(([key, value]) => {
        if (!value) return true;

        if (typeof value === "string" && typeof item[key as keyof Model] === "string") {
          return (item[key as keyof Model] as string).toLowerCase().includes(value.toLowerCase());
        }

        return item[key as keyof Model] === value;
      });
    });
  }, [data, searchFilters]);

  return { filteredData, searchFilters, setSearchFilters };
};

export default useFilterData;