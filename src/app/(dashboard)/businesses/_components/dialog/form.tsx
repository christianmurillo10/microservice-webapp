"use client";

import * as React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Fieldset,
  Portal,
  useDisclosure
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { TableActionRef } from "@/types/common";
import { useFetchBusinessesById } from "@/hooks/useFetchBusinessesById";
import CustomInput from "@/components/forms/input";

const DialogBusinessForm = React.forwardRef<TableActionRef>((_props, ref) => {
  // State
  const { open, onOpen, onClose } = useDisclosure();
  const [formId, setFormId] = React.useState<number | null>(null);

  // Hooks
  const { data, isLoading, isError } = useFetchBusinessesById(formId ?? undefined);
  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      domain: data?.domain ?? "",
      preferred_timezone: data?.preferred_timezone ?? "",
      currency: data?.currency ?? ""
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })

  React.useImperativeHandle(ref, () => ({
    handleOpen(id?: string | number) {
      if (id) {
        setFormId(Number(id));
      } else {
        setFormId(Number(null));
      }

      onOpen();
    }
  }));

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onClose}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
            >
              <Dialog.Header>
                <Dialog.Title>{formId ? "Update" : "Create"}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Fieldset.Root size="lg" maxW="md">
                  <Fieldset.Content>
                    <form.Field
                      name="name"
                      validators={{
                        onChange: ({ value }) =>
                          !value
                            ? 'A name is required'
                            : value.length < 3
                              ? 'Name must be at least 3 characters'
                              : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) => setTimeout(resolve, 1000))
                          return (
                            value.includes('error') && 'No "error" allowed in name'
                          )
                        },
                      }}
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Name"
                            placeholder="Name"
                            value={state.value}
                            required={true}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.join(',')}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="domain"
                      validators={{
                        onChange: ({ value }) =>
                          value.length < 3
                            ? 'Domain must be at least 3 characters'
                            : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) => setTimeout(resolve, 1000))
                          return (
                            value.includes('error') && 'No "error" allowed in domain'
                          )
                        },
                      }}
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Domain"
                            placeholder="Domain"
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.join(',')}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="preferred_timezone"
                      validators={{
                        onChange: ({ value }) =>
                          value.length < 3
                            ? 'Timezone must be at least 3 characters'
                            : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) => setTimeout(resolve, 1000))
                          return (
                            value.includes('error') && 'No "error" allowed in timezone'
                          )
                        },
                      }}
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Timezone"
                            placeholder="Timezone"
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.join(',')}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="currency"
                      validators={{
                        onChange: ({ value }) =>
                          value.length < 3
                            ? 'Currency must be at least 3 characters'
                            : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) => setTimeout(resolve, 1000))
                          return (
                            value.includes('error') && 'No "error" allowed in currency'
                          )
                        },
                      }}
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Currency"
                            placeholder="Currency"
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.join(',')}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        )
                      }}
                    />
                  </Fieldset.Content>
                </Fieldset.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <>
                      <Button
                        type="reset"
                        variant="subtle"
                        onClick={(e) => {
                          e.preventDefault()
                          form.reset()
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                      >
                        {isSubmitting ? '...' : 'Save'}
                      </Button>
                    </>
                  )}
                />
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root >
  );
});

export default DialogBusinessForm;