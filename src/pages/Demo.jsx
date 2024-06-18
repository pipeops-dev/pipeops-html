import React from 'react';
import { Flex, Box, Text, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';

export default function Demo() {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-around"
      p={8}
    >
      <Box p={5}>
        <Text fontSize="xl" fontWeight="bold">Welcome to Our Demo</Text>
        <Text mt={4}>Discover the benefits of attendance taking.</Text>
      </Box>
      <Box p={5}>
        <FormControl id="demo-form" isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Your Name" />
          <FormLabel mt={4}>Telephone</FormLabel>
          <Input placeholder="Your Telephone Number" />
          <FormLabel mt={4}>Email</FormLabel>
          <Input placeholder="Your Email" />
          <FormLabel mt={4}>Response</FormLabel>
          <Textarea placeholder="Your Response" />
          <Button mt={4} colorScheme="blue">Get Demo</Button>
        </FormControl>
      </Box>
    </Flex>
  );
}