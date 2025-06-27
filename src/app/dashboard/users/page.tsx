import Link from "next/link";
import { Box, Breadcrumb } from "@chakra-ui/react";

export default function Users() {
  return (
    <Box>
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link as={Link} href="/dashboard">Dashboard</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Users</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  );
};
