import React from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex, // Import Flex from Chakra UI
  Box
} from '@chakra-ui/react';
import { useEffect } from 'react';
import logo from '../../images/logo-revamp.svg'
export default function AttendanceForm() {

    useEffect(() => {
        document.body.classList.add("bg-color");
      }, []);
  return (
    <>
   
    <Flex height="100vh" alignItems="center" justifyContent="center"> 
   
      <Container centerContent p={{ base: 4, md: 8 }}>
      <Box mt={2} alignSelf="center"> {/* Adjust marginTop as needed */}
        <img src={logo} width={'25%'} alt="logo" />
        </Box>
        <VStack
          spacing={4}
          w="full"
          maxW="md"
          bg="white"
          rounded="xl"
          boxShadow="lg"
          p={6}
        >
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="matricNumber">
            <FormLabel>Matric Number</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="department">
            <FormLabel>Department</FormLabel>
            <Input type="text" />
          </FormControl>
        </VStack>
      </Container>
    </Flex>
    </>
  );
}