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
import { Users } from "@/entities/users";
import { DataTableColumn, TableActionRef } from "@/types/common";
import BasePageHeader from "@/components/common/page-header";
import BaseDataTable from "@/components/common/dataTable";
import UsersSearch, { defaultSearchData, SearchFiltersData } from "./_components/search";
import UserDialogView from "./_components/dialog/view";
import UserDialogForm from "./_components/dialog/form";
import UserDialogDelete from "./_components/dialog/delete";
import useFetchAllUsers from "@/hooks/useFetchAllUsers";
import useFilterData from "@/hooks/useFilterData";

const moduleName = "Users";

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
    key: "email",
    label: "Email",
    header: {
      desktop: true,
      mobile: false
    }
  },
  {
    key: "username",
    label: "Username",
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

export default function UsersPage() {
  const viewRef = React.useRef<TableActionRef>(null);
  const formRef = React.useRef<TableActionRef>(null);
  const deleteRef = React.useRef<TableActionRef>(null);
  const [page, setPage] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(10);
  const { data, dataCount } = useFetchAllUsers();
  const { filteredData, filter, setFilter } = useFilterData<Users, SearchFiltersData>(data, defaultSearchData);

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
              <UsersSearch searchFilters={filter} setSearchFilters={setFilter} />
            </HStack>
          </Card.Header>
          <Card.Body>
            <BaseDataTable<Users>
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
        <UserDialogView ref={viewRef} />
        <UserDialogForm ref={formRef} />
        <UserDialogDelete ref={deleteRef} />
      </GridItem>
    </Grid>
  );
};
