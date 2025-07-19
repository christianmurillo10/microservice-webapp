import { Button, CloseButton, Drawer, Fieldset, Portal } from "@chakra-ui/react"
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import CustomInput from "@/components/forms/input";
import CustomSelect from "@/components/forms/select";
import mockTimezones from "@/mockData/mockTimezones.json";
import mockCurrencies from "@/mockData/mockCurrencies.json";

type BusinessesSearchFiltersProps = {
  onClose: () => void;
  isOpen?: boolean;
};

const schema = z.object({
  name: z.string(),
  preferred_timezone: z.string(),
  currency: z.string(),
});

const BusinessesSearchFilters = ({
  onClose,
  isOpen
}: BusinessesSearchFiltersProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      preferred_timezone: "",
      currency: "",
    },
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
    <Drawer.Root
      open={isOpen}
      onOpenChange={handleClose}
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
                            value={state.value}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="preferred_timezone"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomSelect
                            label="Timezone"
                            placeholder="Select one"
                            value={state.value}
                            options={mockTimezones}
                            isError={state.meta.isTouched && !state.meta.isValid}
                            errorMessage={state.meta.errors.map((err) => err && err.message).join(',')}
                            handleChange={handleChange}
                          />
                        )
                      }}
                    />
                    <form.Field
                      name="currency"
                      children={({ state, handleChange }) => {
                        return (
                          <CustomSelect
                            label="Currency"
                            placeholder="Select one"
                            value={state.value}
                            options={mockCurrencies}
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
                        Reset
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

export default BusinessesSearchFilters;