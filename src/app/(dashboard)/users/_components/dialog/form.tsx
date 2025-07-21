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
import useFetchUsersById from "@/hooks/useFetchUsersById";
import CustomInput from "@/components/forms/input";
import CustomSelect from "@/components/forms/select";
import mockBusinesses from "@/mockData/mockBusinesses.json";
import mockRoles from "@/mockData/mockRoles.json";

const schema = z.object({
  name: z.string().nonempty("This field is required"),
  username: z.string().nonempty("This field is required"),
  email: z.email({ error: "Must be in email format" }).nonempty("This field is required"),
  business_id: z.number(),
  role_id: z.number({ error: "This field is required" }),
  is_active: z.boolean(),
});

const DialogBusinessForm = React.forwardRef<TableActionRef>((_props, ref) => {
  // State
  const { open, onOpen, onClose } = useDisclosure();
  const [formId, setFormId] = React.useState<string | null>(null);

  // Hooks
  const { data } = useFetchUsersById(formId ?? undefined);

  React.useImperativeHandle(ref, () => ({
    handleOpen(id?: string | number) {
      if (id) {
        setFormId(String(id));
      } else {
        setFormId(null);
      }

      onOpen();
    }
  }));

  const defaultValues = formId && data ? {
    name: data.name,
    username: data.username,
    email: data.email,
    business_id: data.business_id ?? 0,
    role_id: data.role_id,
    is_active: data.is_active,
  } : {
    name: "",
    username: "",
    email: "",
    business_id: 0,
    role_id: "",
    is_active: false,
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
                      name="username"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomInput
                            label="Username"
                            placeholder="Username"
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
                      name="email"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomInput
                            label="Email"
                            placeholder="Email"
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
                      name="business_id"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomSelect
                            label="Business"
                            placeholder="Select one"
                            value={state.value}
                            options={mockBusinesses}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={(value) => handleChange(Number(value))}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="role_id"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomSelect
                            label="Roles"
                            placeholder="Select one"
                            value={state.value}
                            required={true}
                            options={mockRoles}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={(value) => handleChange(value ? Number(value) : "")}
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

export default DialogBusinessForm;