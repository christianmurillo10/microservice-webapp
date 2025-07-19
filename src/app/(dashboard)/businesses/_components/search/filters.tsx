import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"

type BusinessesSearchFiltersProps = {
  onClose: () => void;
  isOpen?: boolean;
};

const BusinessesSearchFilters = ({
  onClose,
  isOpen
}: BusinessesSearchFiltersProps) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnEscape={false}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Search Filters</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Reset</Button>
              <Button variant="subtle" colorPalette="blue">Search</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default BusinessesSearchFilters;