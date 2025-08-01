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
import useFetchRolesById from "@/hooks/useFetchRolesById";
import CustomInput from "@/components/forms/input";
import CustomTextarea from "@/components/forms/textarea";

const schema = z.object({
  name: z.string().nonempty("This field is required"),
  description: z.string(),
});

const RoleDialogForm = React.forwardRef<TableActionRef>((_props, ref) => {
  // State
  const { open, onOpen, onClose } = useDisclosure();
  const [formId, setFormId] = React.useState<number | null>(null);

  // Hooks
  const { data } = useFetchRolesById(formId ?? undefined);

  React.useImperativeHandle(ref, () => ({
    handleOpen(id?: string | number) {
      if (id) {
        setFormId(Number(id));
      } else {
        setFormId(null);
      }

      onOpen();
    }
  }));

  const defaultValues = formId && data ? {
    name: data.name,
    description: data.description ?? "",
  } : {
    name: "",
    description: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleClose}
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
                      children={({ state, handleChange }) => {
                        return (
                          <CustomInput
                            label="Name"
                            placeholder="Name"
                            value={state.value}
                            required={true}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="description"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomTextarea
                            label="Description"
                            placeholder="Description"
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
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
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault()
                          form.reset()
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        variant="subtle"
                        colorPalette="blue"
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

export default RoleDialogForm;