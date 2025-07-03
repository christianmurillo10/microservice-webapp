"use client"

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CloseButton,
  Collapsible,
  Flex,
  Grid,
  GridItem,
  Group,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { Download, ListFilter, ListFilterIcon, LucideChevronDown, LucideChevronLeft, LucideChevronRight, Plus, Search } from "lucide-react";

const items = [
  { id: 1, created_at: "June 1, 2023", name: "Company 1", domain: "www.company1.com" },
  { id: 2, created_at: "January 12, 2023", name: "Company 2", domain: "www.company2.com" },
  { id: 3, created_at: "August 27, 2024", name: "Company 3", domain: "www.company3.com" },
  { id: 4, created_at: "May 17, 2025", name: "Company 4", domain: "www.company4.com" },
  { id: 5, created_at: "December 7, 2025", name: "Company 5", domain: "www.company5.com" },
];

export default function Businesses() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("")
        inputRef.current?.focus()
      }}
      me="-2"
    />
  ) : <Search />;

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
        <Flex gap="2" flexDirection={{ base: "column", sm: "row" }}>
          <Text
            flex="1 1 100%"
            alignContent="center"
            textStyle="2xl"
            fontWeight="bold"
          >
            Businesses
          </Text>
          <Button variant="subtle" colorPalette="green">
            <Plus />
            New
          </Button>
          <Button variant="subtle" colorPalette="orange">
            <Download />
            Export
          </Button>
        </Flex>
      </GridItem>
      <GridItem colSpan={1}>
        <Card.Root variant="elevated" width="100%">
          <Card.Header>
            <HStack
              flexDirection={{ base: "column", md: "row" }}
              justifyContent={{ base: "unset", md: "space-between" }}
              alignItems={{ base: "start", md: "unset" }}
            >
              <Card.Title>List</Card.Title>
              <Group
                attached
                width={{ base: "full", md: 400 }}
              >
                <IconButton
                  variant="outline"
                  size="md"
                  aria-label="Filter button"
                >
                  <ListFilterIcon />
                </IconButton>
                <InputGroup endElement={endElement}>
                  <Input
                    ref={inputRef}
                    focusRing="none"
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => {
                      setValue(e.currentTarget.value)
                    }}
                  />
                </InputGroup>
              </Group>
            </HStack>
          </Card.Header>
          <Card.Body color="fg.muted">
            <Stack>
              {/* MOBILE VIEW (Collapsible Cards) */}
              <Box display={{ base: 'block', md: 'none' }}>
                {items.map((item) => (
                  <Collapsible.Root key={item.id}>
                    <Box borderWidth="1px" borderRadius="md" p={2} mb={2}>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="bold">{item.name}</Text>
                          <Text fontSize="sm">{item.created_at}</Text>
                        </Box>
                        <Collapsible.Trigger as={Box}>
                          <IconButton
                            variant="ghost"
                            size="sm"
                            aria-label="Collapse button"
                          >
                            <LucideChevronDown size="10" />
                          </IconButton>
                        </Collapsible.Trigger>
                      </Flex>

                      <Collapsible.Content mt={2}>
                        <Text fontSize="sm">
                          <strong>Domain:</strong> {item.domain}
                        </Text>
                      </Collapsible.Content>
                    </Box>
                  </Collapsible.Root>
                ))}
              </Box>

              {/* DESKTOP VIEW (Standard Table) */}
              <Table.ScrollArea
                display={{ base: 'none', md: 'block' }}
                width="100%"
                overflowX="auto"
                maxW="100%"
              >
                <Box minW="800px">
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
                </Box>
              </Table.ScrollArea>

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
