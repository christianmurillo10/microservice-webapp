"use client"

import {
  Breadcrumb,
  ButtonGroup,
  Card,
  For,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Pagination,
  Stack,
  Stat,
  Table,
  Tag,
  Text,
  Timeline,
} from "@chakra-ui/react";
import { BriefcaseBusiness, LucideChevronLeft, LucideChevronRight, User, UserCheck, Users } from "lucide-react";

const items = [
  { id: 1, created_at: "June 1, 2023", name: "Christian Murillo", email: "christianoroceomurillo@gmail.com", is_active: true },
  { id: 2, created_at: "January 12, 2023", name: "Juan Ponce Enrile", email: "juanpenrile@yahoo.com", is_active: false },
  { id: 3, created_at: "August 27, 2024", name: "John Doe", email: "johndoe@outlook.com", is_active: true },
  { id: 4, created_at: "May 17, 2025", name: "Victor Tangol", email: "victortangol@gmail.com", is_active: true },
  { id: 5, created_at: "December 7, 2025", name: "Martial Pilato", email: "martialpilato@cloud.com", is_active: false },
];

export default function Home() {
  return (
    <Grid
      templateColumns="repeat(1, 1fr)"
      gap={6}
      width="100%"
    >
      <GridItem colSpan={1}>
        <Breadcrumb.Root size="sm">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>Dashboard</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </GridItem>
      <GridItem colSpan={1}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={6}
          width="100%"
        >
          <GridItem colSpan={1}>
            <Card.Root variant="elevated" size="lg" width="100%">
              <Card.Body color="fg.muted">
                <HStack gap="5">
                  <BriefcaseBusiness size="40" color="#2563eb" />
                  <Stat.Root>
                    <Stat.Label>Businesses</Stat.Label>
                    <Stat.ValueText>5</Stat.ValueText>
                  </Stat.Root>
                </HStack>
              </Card.Body>
            </Card.Root>
          </GridItem>
          <GridItem colSpan={{ base: 1, sm: 1, md: 1, lg: 1 }}>
            <Card.Root variant="elevated" size="lg" width="100%">
              <Card.Body color="fg.muted">
                <HStack gap="5">
                  <Users size="40" color="#b98131" />
                  <Stat.Root>
                    <Stat.Label>Users</Stat.Label>
                    <Stat.ValueText>20</Stat.ValueText>
                  </Stat.Root>
                </HStack>
              </Card.Body>
            </Card.Root>
          </GridItem>
          <GridItem colSpan={1}>
            <Card.Root variant="elevated" size="lg" width="100%">
              <Card.Body color="fg.muted">
                <HStack gap="5">
                  <UserCheck size="40" color="#31b953" />
                  <Stat.Root>
                    <Stat.Label>Active Users</Stat.Label>
                    <Stat.ValueText>15</Stat.ValueText>
                  </Stat.Root>
                </HStack>
              </Card.Body>
            </Card.Root>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem colSpan={1}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={6}
          width="100%"
        >
          <GridItem colSpan={{ base: 1, sm: 1, md: 2 }}>
            <Card.Root variant="elevated" width="100%">
              <Card.Header>
                <Card.Title>Recent Users</Card.Title>
              </Card.Header>
              <Card.Body color="fg.muted">
                <Stack width="full" gap="5">
                  <Table.Root size="sm" variant="line" interactive>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>User</Table.ColumnHeader>
                        <Table.ColumnHeader>Date Created</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Active?</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <For each={items}>
                        {(item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.created_at}</Table.Cell>
                            <Table.Cell textAlign="center">
                              <Tag.Root size="sm" colorPalette={item.is_active ? "green" : "red"}>
                                <Tag.Label>{item.is_active ? "Yes" : "No"}</Tag.Label>
                              </Tag.Root>
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </For>
                    </Table.Body>
                  </Table.Root>

                  <Pagination.Root count={items.length * 5} pageSize={5} page={1}>
                    <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                      <Pagination.PrevTrigger asChild>
                        <IconButton>
                          <LucideChevronLeft />
                        </IconButton>
                      </Pagination.PrevTrigger>

                      <Pagination.Items
                        render={(page) => (
                          <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                            {page.value}
                          </IconButton>
                        )}
                      />

                      <Pagination.NextTrigger asChild>
                        <IconButton>
                          <LucideChevronRight />
                        </IconButton>
                      </Pagination.NextTrigger>
                    </ButtonGroup>
                  </Pagination.Root>
                </Stack>
              </Card.Body>
            </Card.Root>
          </GridItem>
          <GridItem colSpan={1}>
            <Card.Root variant="elevated" size="lg" width="100%">
              <Card.Header>
                <Card.Title>Recent Activity</Card.Title>
              </Card.Header>
              <Card.Body color="fg.muted">
                <Timeline.Root maxW="400px">
                  <Timeline.Item>
                    <Timeline.Connector>
                      <Timeline.Separator />
                      <Timeline.Indicator>
                        <User />
                      </Timeline.Indicator>
                    </Timeline.Connector>
                    <Timeline.Content>
                      <Timeline.Title>Christian Murillo</Timeline.Title>
                      <Timeline.Description>30th June 2025</Timeline.Description>
                      <Text textStyle="sm">
                        Updated name
                      </Text>
                    </Timeline.Content>
                  </Timeline.Item>

                  <Timeline.Item>
                    <Timeline.Connector>
                      <Timeline.Separator />
                      <Timeline.Indicator>
                        <User />
                      </Timeline.Indicator>
                    </Timeline.Connector>
                    <Timeline.Content>
                      <Timeline.Title>Christian Murillo</Timeline.Title>
                      <Timeline.Description>18th June 2025</Timeline.Description>
                      <Text textStyle="sm">
                        Updated password
                      </Text>
                    </Timeline.Content>
                  </Timeline.Item>

                  <Timeline.Item>
                    <Timeline.Connector>
                      <Timeline.Separator />
                      <Timeline.Indicator>
                        <User />
                      </Timeline.Indicator>
                    </Timeline.Connector>
                    <Timeline.Content>
                      <Timeline.Title>Christian Murillo</Timeline.Title>
                      <Timeline.Description>10th June 2025</Timeline.Description>
                      <Text textStyle="sm">
                        Changed profile picture
                      </Text>
                    </Timeline.Content>
                  </Timeline.Item>
                </Timeline.Root>
              </Card.Body>
            </Card.Root>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
