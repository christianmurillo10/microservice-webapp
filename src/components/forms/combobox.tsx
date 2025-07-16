"use client";

import * as React from "react";
import { Combobox, useFilter, useListCollection } from "@chakra-ui/react";

type CustomComboboxPropsOption = {
  id: string | number,
  name: string
};

type CustomComboboxProps = {
  label: string;
  placeholder?: string;
  value: string | number;
  required?: boolean;
  options: CustomComboboxPropsOption[];
  isError: boolean;
  handleChange: (value: string) => void;
  errorMessage: string;
};

const CustomCombobox = ({
  label,
  placeholder,
  value,
  required = false,
  options,
  isError,
  errorMessage,
  handleChange
}: CustomComboboxProps) => {
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: options,
    filter: contains,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
    >
      <Combobox.Label>Select one</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder={placeholder} />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No items found</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item item={item} key={item.id}>
              {item.name}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

export default CustomCombobox;