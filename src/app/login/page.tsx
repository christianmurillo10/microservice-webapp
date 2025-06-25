"use client";

import {
  Avatar,
  Box,
  Button,
  ClientOnly,
  Field,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function Login() {
  return (
    <ClientOnly>
      <Flex minH="100vh">
        <Box
          w="30%"
          display={{ base: "none", lg: "block" }}
          bg={useColorModeValue("blue.500", "blue.900")}
        >
          <VStack
            h="100vh"
            align="start"
            justifyContent="space-between"
            p="4"
          >
            <Heading color="white">Microservice</Heading>
            <VStack
              align="start"
              justify="start"
              mt="4"
              p="3"
              rounded="lg"
              bgImage="linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3))"
            >
              <Avatar.Root>
                <Avatar.Fallback name="Christian Murillo" />
              </Avatar.Root>
              <Heading as="h3" fontSize="lg" color="white">
                Christian Murillo
              </Heading>
              <Text color="white">
                Welcome to the microservice dashboard. This is your central hub for managing users, content, and system settings. Take control and keep everything running efficiently.
              </Text>
            </VStack>
          </VStack>
        </Box>
        <Box w={{ base: "100%", lg: "70%" }} minH="100vh" p="8">
          <VStack
            align="center"
            gap="5"
            justify="center"
            h="100%"
            alignItems="stretch"
            w={{ base: "100%", md: "80%", lg: "60%", xl: "40%" }}
            mx="auto"
          >
            <Heading as="h1" fontSize="3xl" textAlign="center">
              Sign in to Microservice
            </Heading>
            <VStack gap="4" as="form">
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  placeholder="Email Address"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  placeholder="*******"
                />
              </Field.Root>
              <Button w="full" size="lg" colorScheme="blue">
                Sign In
              </Button>
            </VStack>
            <Text mt="3" fontWeight="medium" textAlign="center">
              Don&apos;t have an account?{" "}
              <Link color="blue.400">Register</Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </ClientOnly>
  );
};
