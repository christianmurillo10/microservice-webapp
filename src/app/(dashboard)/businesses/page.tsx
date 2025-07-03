"use client"

import Link from "next/link";
import {
  Breadcrumb,
  ButtonGroup,
  Card, Grid,
  GridItem,
  IconButton,
  Pagination,
  Stack,
  Table,
  Tag
} from "@chakra-ui/react";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

const items = [
  { id: 1, created_at: "June 1, 2023", name: "Company 1", domain: "www.company1.com" },
  { id: 2, created_at: "January 12, 2023", name: "Company 2", domain: "www.company2.com" },
  { id: 3, created_at: "August 27, 2024", name: "Company 3", domain: "www.company3.com" },
  { id: 4, created_at: "May 17, 2025", name: "Company 4", domain: "www.company4.com" },
  { id: 5, created_at: "December 7, 2025", name: "Company 5", domain: "www.company5.com" },
];

export default function Businesses() {
  return (
    <Grid
      templateColumns="repeat(1, 1fr)"
      gap={6}
      width="100%"
    >
      <GridItem colSpan={1}>
        <Breadcrumb.Root size="lg">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                as={Link}
                href="/"
                focusRing="none"
              >
                Dashboard
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>Businesses</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </GridItem>
      <GridItem colSpan={1}>
        <Card.Root variant="elevated" width="100%">
          <Card.Header>
            <Card.Title>Manage Businesses</Card.Title>
          </Card.Header>
          <Card.Body color="fg.muted">
            <Stack width="full" gap="5">
              <Table.Root size="sm" variant="line" interactive>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Domain</Table.ColumnHeader>
                    <Table.ColumnHeader>Date Created</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {items.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.domain}</Table.Cell>
                      <Table.Cell>{item.created_at}</Table.Cell>
                    </Table.Row>
                  ))}
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
    </Grid>
  );
};
