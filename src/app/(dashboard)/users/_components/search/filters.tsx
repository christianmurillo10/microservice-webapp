import { Button, CloseButton, Drawer, Fieldset, Portal } from "@chakra-ui/react"
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import CustomInput from "@/components/forms/input";
import CustomSelect from "@/components/forms/select";
import { SearchFiltersData } from ".";
import mockBusinesses from "@/mockData/mockBusinesses.json";
import mockRoles from "@/mockData/mockRoles.json";

type UsersSearchFiltersProps = {
  onClose: () => void;
  isOpen?: boolean;
  defaultValues: SearchFiltersData;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFiltersData>>;
};

const schema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  business_id: z.number(),
  role_id: z.number(),
  is_active: z.boolean(),
});

const UsersSearchFilters = ({
  onClose,
  isOpen,
  defaultValues,
  setSearchFilters
}: UsersSearchFiltersProps) => {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema
    },
    onSubmit: async ({ value }) => {
      setSearchFilters(value);
    },
  });

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnEscape={false}
    >
      <Portal>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Search Filters</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Fieldset.Root size="lg" maxW="md">
                  <Fieldset.Content>
                    <form.Field
                      name="name"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomInput
                            label="Name"
                            placeholder="Name"
                            value={state.value || ""}
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
                            value={state.value || ""}
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
                            value={state.value || ""}
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
                            value={state.value || 0}
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
                            value={state.value || 0}
                            options={mockRoles}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={(value) => handleChange(Number(value))}
                          />
                        )
                      }}
                    />
                  </Fieldset.Content>
                </Fieldset.Root>
              </Drawer.Body>
              <Drawer.Footer>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault()
                          form.reset()
                        }}
                      >
                        Clear
                      </Button>
                      <Button
                        type="submit"
                        variant="subtle"
                        colorPalette="blue"
                        disabled={!canSubmit}
                      >
                        {isSubmitting ? '...' : 'Search'}
                      </Button>
                    </>
                  )}
                />
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </form>
      </Portal>
    </Drawer.Root >
  );
};

export default UsersSearchFilters;