"use client";

import * as React from "react";
import { CloseButton, Group, IconButton, Input, InputGroup, useDisclosure } from "@chakra-ui/react";
import { ListFilterIcon, Search } from "lucide-react";
import DrawerSearchFilter from "@/app/(dashboard)/businesses/_components/search/filters";

type BusinessesSearchProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const BusinessesSearch = ({
  value,
  setValue
}: BusinessesSearchProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { open, setOpen, onClose } = useDisclosure();

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("")
        inputRef.current?.focus()
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
          ref={inputRef}
          focusRing="none"
          placeholder="Search..."
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value)
          }}
        />
      </InputGroup>
      <DrawerSearchFilter
        isOpen={open}
        onClose={onClose}
      />
    </Group>
  );
};

export default BusinessesSearch;