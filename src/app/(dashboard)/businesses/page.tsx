"use client";

import * as React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  Card,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { Businesses } from "@/entities/businesses";
import { DataTableColumn, TableActionRef } from "@/types/common";
import BasePageHeader from "@/components/common/page-header";
import BaseDataTable from "@/components/common/dataTable";
import BusinessesSearch from "./_components/search";
import DialogBusinessView from "./_components/dialog/view";
import DialogBusinessForm from "./_components/dialog/form";
import DialogBusinessDelete from "./_components/dialog/delete";
import { useFetchAllBusinesses } from "@/hooks/useFetchAllBusinesses";

const moduleName = "Businesses";

const columns: DataTableColumn[] = [
  {
    key: "name",
    label: "Name",
    header: {
      desktop: true,
      mobile: true
    }
  },
  {
    key: "domain",
    label: "Domain",
    header: {
      desktop: true,
      mobile: false
    }
  },
  {
    key: "created_at",
    label: "Date Created",
    header: {
      desktop: true,
      mobile: true
    }
  }
];

export default function BusinessesPage() {
  const viewRef = React.useRef<TableActionRef>(null);
  const formRef = React.useRef<TableActionRef>(null);
  const deleteRef = React.useRef<TableActionRef>(null);
  const [search, setSearch] = React.useState<string>("");
  const { data } = useFetchAllBusinesses();

  const filteredData = React.useMemo(() => {
    if (!search) return data;

    return data?.filter((item: Businesses) => {
      return (
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.domain?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [data, search]);

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
              <Breadcrumb.CurrentLink>{moduleName}</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </GridItem>
      <GridItem colSpan={1}>
        <BasePageHeader title={moduleName} formRef={formRef} />
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
              <BusinessesSearch value={search} setValue={setSearch} />
            </HStack>
          </Card.Header>
          <Card.Body>
            <BaseDataTable<Businesses>
              columns={columns}
              rows={filteredData}
              viewRef={viewRef}
              formRef={formRef}
              deleteRef={deleteRef}
            />
          </Card.Body>
        </Card.Root>
        <DialogBusinessView ref={viewRef} />
        <DialogBusinessForm ref={formRef} />
        <DialogBusinessDelete ref={deleteRef} />
      </GridItem>
    </Grid>
  );
};
