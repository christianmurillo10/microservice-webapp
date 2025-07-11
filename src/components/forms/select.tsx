"use client";

import { Field, ListCollection, Portal, Select } from "@chakra-ui/react";

type CustomSelectProps = {
  options: ListCollection;
  error: string;
};

const CustomSelect = ({ options, error }: CustomSelectProps) => {
  return (
    <Field.Root invalid>
      <Select.Root collection={options} size="sm" width="320px">
        <Select.HiddenSelect />
        <Select.Label>Select one</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select one" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {options.items.map((option) => (
                <Select.Item item={option} key={option.value}>
                  {option.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      {error && (
        <Field.ErrorText>{error}</Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default CustomSelect;