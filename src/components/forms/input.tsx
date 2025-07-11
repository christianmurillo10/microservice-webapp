"use client";

import { Field, Input } from "@chakra-ui/react";

type CustomInputProps = {
  label: string;
  placeholder?: string;
  error: string;
};

const CustomInput = ({
  label,
  placeholder,
  error
}: CustomInputProps) => {
  return (
    <Field.Root invalid>
      <Field.Label>{label}</Field.Label>
      <Input placeholder={placeholder ?? ""} />
      {error && (
        <Field.ErrorText>{error}</Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default CustomInput;