import Layout from "@/components/layout";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <Box textAlign="center">
        <Heading as="h3">Home Page</Heading>
        <Text>Home Page Content</Text>
      </Box>
    </Layout>
  );
};
