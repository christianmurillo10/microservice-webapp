import Link from "next/link";
import {
  Breadcrumb,
  Card,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import CustomPageHeader from "@/components/common/page-header";
import CustomSearch from "@/components/common/search";
import { Businesses } from "@/entities/businesses";
import { DataListColumn } from "@/types/common";
import CustomDataList from "@/components/common/dataList";

const moduleName = "Businesses";

const columns: DataListColumn[] = [
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
]

const items: Businesses[] = [
  {
    id: 1,
    created_at: "June 1, 2023",
    name: "Company 1",
    api_key: "key-company1",
    domain: "www.company1.com",
    preferred_timezone: "Asia/Hong Kong",
    currency: "PHP"
  },
  {
    id: 2,
    created_at: "January 12, 2023",
    name: "Company 2",
    api_key: "key-company2",
    domain: "www.company2.com",
    preferred_timezone: "Asia/Hong Kong",
    currency: "PHP"
  },
  {
    id: 3,
    created_at: "August 27, 2024",
    name: "Company 3",
    api_key: "key-company3",
    domain: "www.company3.com",
    preferred_timezone: "Asia/Hong Kong",
    currency: "PHP"
  },
  {
    id: 4,
    created_at: "May 17, 2025",
    name: "Company 4",
    api_key: "key-company4",
    domain: "www.company4.com",
    preferred_timezone: "Asia/Hong Kong",
    currency: "PHP"
  },
  {
    id: 5,
    created_at: "December 7, 2025",
    name: "Company 5",
    api_key: "key-company5",
    domain: "www.company5.com",
    preferred_timezone: "Asia/Hong Kong",
    currency: "PHP"
  },
];

export default function BusinessePage() {
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
        <CustomPageHeader title={moduleName} />
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
              <CustomSearch />
            </HStack>
          </Card.Header>
          <Card.Body color="fg.muted">
            <CustomDataList<Businesses> columns={columns} rows={items} />
          </Card.Body>
        </Card.Root>
      </GridItem>
    </Grid>
  );
};
