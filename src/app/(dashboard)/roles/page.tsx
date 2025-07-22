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
import { Roles } from "@/entities/roles";
import { DataTableColumn, TableActionRef } from "@/types/common";
import BasePageHeader from "@/components/common/page-header";
import BaseDataTable from "@/components/common/dataTable";
import RolesSearch, { defaultSearchData, SearchFiltersData } from "./_components/search";
import RoleDialogView from "./_components/dialog/view";
import RoleDialogForm from "./_components/dialog/form";
import RoleDialogDelete from "./_components/dialog/delete";
import useFetchAllRoles from "@/hooks/useFetchAllRoles";
import useFilterData from "@/hooks/useFilterData";

const moduleName = "Roles";

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
    key: "description",
    label: "Desription",
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

export default function RolesPage() {
  const viewRef = React.useRef<TableActionRef>(null);
  const formRef = React.useRef<TableActionRef>(null);
  const deleteRef = React.useRef<TableActionRef>(null);
  const [page, setPage] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(10);
  const { data, dataCount } = useFetchAllRoles();
  const { filteredData, filter, setFilter } = useFilterData<Roles, SearchFiltersData>(data, defaultSearchData);

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
              <RolesSearch searchFilters={filter} setSearchFilters={setFilter} />
            </HStack>
          </Card.Header>
          <Card.Body>
            <BaseDataTable<Roles>
              columns={columns}
              rows={filteredData}
              rowCount={dataCount}
              pageSize={pageSize}
              page={page}
              setPage={setPage}
              viewRef={viewRef}
              formRef={formRef}
              deleteRef={deleteRef}
            />
          </Card.Body>
        </Card.Root>
        <RoleDialogView ref={viewRef} />
        <RoleDialogForm ref={formRef} />
        <RoleDialogDelete ref={deleteRef} />
      </GridItem>
    </Grid>
  );
};
