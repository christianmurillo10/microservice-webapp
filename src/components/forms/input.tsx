"use client";

import { Field, Input } from "@chakra-ui/react";
import * as React from "react";

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
        <Field.ErrorText>This is an error text</Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default CustomInput;