"use client";

import { Field, Input } from "@chakra-ui/react";

type CustomInputProps = {
  label: string;
  placeholder?: string;
  value: string | number;
  required?: boolean;
  isError: boolean;
  errorMessage: string;
  handleChange: (value: string) => void;
  handleBlur: () => void;
};

const CustomInput = ({
  label,
  placeholder,
  value,
  required = false,
  isError,
  errorMessage,
  handleChange,
  handleBlur
}: CustomInputProps) => {
  return (
    <Field.Root invalid={isError} required={required}>
      <Field.Label>
        {label}
        {required && (<Field.RequiredIndicator />)}
      </Field.Label>
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