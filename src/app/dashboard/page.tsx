import {
  Card,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={6}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <GridItem
          key={i}
          colSpan={{ base: 1, sm: 1, md: 1, lg: 1 }}
        >
          <Card.Root size="lg">
            <Card.Header>
              <Heading size="md">Card {i + 1}</Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              <Text>
                This is the card body. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Text>
            </Card.Body>
          </Card.Root>
        </GridItem>
      ))}
    </Grid>
  );
}
