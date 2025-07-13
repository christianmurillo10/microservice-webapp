"use client";

import { Field, Input } from "@chakra-ui/react";

type CustomInputProps = {
  label: string;
  placeholder?: string;
  value: string | number;
  isError: boolean;
  errorMessage: string;
  handleChange: (value: string) => void;
  handleBlur: () => void;
};

const CustomInput = ({
  label,
  placeholder,
  value,
  isError,
  errorMessage,
  handleChange,
  handleBlur
}: CustomInputProps) => {
  return (
    <Field.Root invalid={isError}>
      <Field.Label>{label}</Field.Label>
      <Input
        placeholder={placeholder ?? ""}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onBlur={handleBlur}
      />
      {isError && (
        <Field.ErrorText>{errorMessage}</Field.ErrorText>
      )}
    </Field.Root >
  );
};

export default CustomInput;