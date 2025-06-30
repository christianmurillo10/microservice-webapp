import Link from "next/link";
import { Box, Breadcrumb } from "@chakra-ui/react";

export default function Roles() {
  return (
    <Box>
      <Breadcrumb.Root size="lg">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link
              as={Link}
              href="/dashboard"
              focusRing="none"
            >
              Dashboard
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Roles</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  );
};
