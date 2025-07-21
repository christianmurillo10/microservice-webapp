"use client";

import { Badge, Field, For, NativeSelect } from "@chakra-ui/react";

type CustomSelectProps = {
  label: string;
  placeholder?: string;
  value: string | number;
  required?: boolean;
  options: Record<string, any>[];
  isError: boolean;
  handleChange: (value: string | number) => void;
  errorMessage: string;
};

const CustomSelect = ({
  label,
  placeholder,
  value,
  required = false,
  options,
  isError,
  errorMessage,
  handleChange
}: CustomSelectProps) => {
  return (
    <Field.Root invalid={isError}>
      <Field.Label>
        {label}
        {!required && (<Field.RequiredIndicator
          fallback={
            <Badge size="xs" variant="surface">
              optional
            </Badge>
          }
        />)}
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.currentTarget.value)}
        >
          <For each={options}>
            {(item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            )}
          </For>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      {isError && (
        <Field.ErrorText>{errorMessage}</Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default CustomSelect;