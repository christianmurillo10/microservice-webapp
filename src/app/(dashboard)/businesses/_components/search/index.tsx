"use client";

import * as React from "react";
import { CloseButton, Group, IconButton, Input, InputGroup, useDisclosure } from "@chakra-ui/react";
import { ListFilterIcon, Search } from "lucide-react";
import DrawerSearchFilter from "./filters";
import useDebounce from "@/hooks/useDebounce";

export type SearchFiltersData = {
  name?: string,
  preferred_timezone?: string,
  currency?: string,
};

type BusinessesSearchProps = {
  searchFilters: SearchFiltersData;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFiltersData>>;
};

export const defaultSearchData: SearchFiltersData = {
  name: "",
  preferred_timezone: "",
  currency: "",
};

const BusinessesSearch = ({
  searchFilters,
  setSearchFilters
}: BusinessesSearchProps) => {
  const { open, setOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState(searchFilters?.name || "");
  const debouncedValue = useDebounce(value, 500);

  React.useEffect(() => {
    setSearchFilters({ ...searchFilters, name: debouncedValue });
  }, [debouncedValue]);

  const endElement = searchFilters && searchFilters.name ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
      }}
      me="-2"
    />
  ) : <Search />;

  return (
    <Group
      attached
      width={{ base: "full", md: 400 }}
    >
      <IconButton
        variant="outline"
        size="md"
        aria-label="Filter button"
        onClick={() => setOpen(true)}
      >
        <ListFilterIcon />
      </IconButton>
      <InputGroup endElement={endElement}>
        <Input
          focusRing="none"
          placeholder="Search..."
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </InputGroup>
      <DrawerSearchFilter
        isOpen={open}
        onClose={onClose}
        defaultValues={defaultSearchData}
        setSearchFilters={setSearchFilters}
      />
    </Group>
  );
};

export default BusinessesSearch;