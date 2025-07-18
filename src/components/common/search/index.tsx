"use client";

import * as React from "react";
import { CloseButton, Group, IconButton, Input, InputGroup } from "@chakra-ui/react";
import { ListFilterIcon, Search } from "lucide-react";

type BaseSearchProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>
};

const BaseSearch = ({
  value,
  setValue
}: BaseSearchProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

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
    </Group>
  );
};

export default BaseSearch;