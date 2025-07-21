import { Button, CloseButton, Drawer, Fieldset, Portal } from "@chakra-ui/react"
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import CustomInput from "@/components/forms/input";
import { SearchFiltersData } from ".";

type RolesSearchFiltersProps = {
  onClose: () => void;
  isOpen?: boolean;
  defaultValues: SearchFiltersData;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFiltersData>>;
};

const schema = z.object({
  name: z.string(),
});

const RolesSearchFilters = ({
  onClose,
  isOpen,
  defaultValues,
  setSearchFilters
}: RolesSearchFiltersProps) => {
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
                            value={state.value ?? ""}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
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

export default RolesSearchFilters;