import * as React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Download, Plus } from "lucide-react";
import { TableActionRef } from "@/types/common";

type PageHeaderProps = {
  title: string;
  formRef?: React.RefObject<TableActionRef>;
  exportRef?: React.RefObject<TableActionRef>;
};

const PageHeader = ({ title, formRef, exportRef }: PageHeaderProps) => {
  return (
    <Flex gap="2" flexDirection={{ base: "column", sm: "row" }}>
      <Text
        flex="1 1 100%"
        alignContent="center"
        textStyle="2xl"
        fontWeight="bold"
      >
        {title}
      </Text>
      {
        formRef ?
          <Button variant="subtle" colorPalette="green">
            <Plus />
            New
          </Button>
          : null
      }
      {
        exportRef ?
          <Button variant="subtle" colorPalette="orange">
            <Download />
            Export
          </Button>
          : null
      }
    </Flex>
  );
};

export default PageHeader;