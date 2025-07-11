"use client";

import * as React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Download, Plus } from "lucide-react";
import { TableActionRef } from "@/types/common";

type BasePageHeaderProps = {
  title: string;
  formRef?: React.RefObject<TableActionRef | null>;
  exportRef?: React.RefObject<TableActionRef | null>;
};

const BasePageHeader = ({ title, formRef, exportRef }: BasePageHeaderProps) => {
  const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (formRef && formRef.current) {
      formRef.current.handleOpen();
    }
  };

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
      {formRef && (
        <Button
          variant="subtle"
          colorPalette="green"
          onClick={e => handleCreate(e)}
        >
          <Plus />
          New
        </Button>
      )}
      {exportRef && (
        <Button variant="subtle" colorPalette="orange">
          <Download />
          Export
        </Button>
      )}
    </Flex>
  );
};

export default BasePageHeader;