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
import BasePageHeader from "@/components/common/page-header";
import BaseSearch from "@/components/common/search";
import { Businesses } from "@/entities/businesses";
import { DataTableColumn, TableActionRef } from "@/types/common";
import BaseDataTable from "@/components/common/dataTable";
import BaseDialogView from "@/components/common/dialog/view";
import businessesData from "../../../../mockData/businesses.json";

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

export default function BusinessePage() {
  const [businesses, _setBusinesses] = React.useState<Businesses[]>(businessesData);
  const viewRef = React.useRef<TableActionRef>(null);

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
        <BasePageHeader title={moduleName} />
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
              <BaseSearch />
            </HStack>
          </Card.Header>
          <Card.Body>
            <BaseDataTable<Businesses>
              columns={columns}
              rows={businesses}
              viewRef={viewRef}
            />
          </Card.Body>
        </Card.Root>
        <BaseDialogView ref={viewRef} />
      </GridItem>
    </Grid>
  );
};
