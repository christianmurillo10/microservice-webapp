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
import { z } from "zod";
import { TableActionRef } from "@/types/common";
import { useFetchBusinessesById } from "@/hooks/useFetchBusinessesById";
import CustomInput from "@/components/forms/input";

const schema = z.object({
  name: z
    .string()
    .min(3, 'You must have a length of at least 3'),
  domain: z.string().min(3, 'You must have a length of at least 3'),
  preferred_timezone: z.string().min(3, 'You must have a length of at least 3'),
  currency: z.string().min(3, 'You must have a length of at least 3'),
});

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
    validators: {
      onChange: schema
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
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Name"
                            placeholder="Name"
                            value={state.value}
                            required={true}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="domain"
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Domain"
                            placeholder="Domain"
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="preferred_timezone"
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Timezone"
                            placeholder="Timezone"
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="currency"
                      children={({ state, handleChange, handleBlur }) => {
                        return (
                          <CustomInput
                            label="Currency"
                            placeholder="Currency"
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
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