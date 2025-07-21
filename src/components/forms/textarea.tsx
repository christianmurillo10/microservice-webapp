"use client";

import { Badge, Field, Textarea } from "@chakra-ui/react";

type CustomTextareaProps = {
  label: string;
  placeholder?: string;
  value: string | number;
  required?: boolean;
  isError: boolean;
  errorMessage: string;
  handleChange: (value: string) => void;
};

const CustomTextarea = ({
  label,
  placeholder,
  value,
  required = false,
  isError,
  errorMessage,
  handleChange
}: CustomTextareaProps) => {
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
      <Textarea
        placeholder={placeholder ?? ""}
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
      {isError && (
        <Field.ErrorText>{errorMessage}</Field.ErrorText>
      )}
    </Field.Root >
  );
};

export default CustomTextarea;