import React from 'react';
import { Flex, Box, Text, FormControl, FormLabel, Input, Textarea, Button, Divider, Icon, HStack } from '@chakra-ui/react';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { MdPlayCircleOutline } from "react-icons/md";
export default function Demo() {
  const navigate = useNavigate();
  const reRoute = () => {
    navigate('/');
  }
  return (
    <>
    <Box backgroundColor={'white'} w={'100vw'} h={'100vh'}>
    <Box py={'1.5rem'} px={'1.5rem'} onClick={reRoute}>
      <img src={logo} alt="logo" />
    </Box>
    <Divider/>
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      justify="space-around"
      p={8}
    >
      <Box p={5}>
        <Text fontSize="xl" fontWeight="bold">Welcome to Our Demo</Text>
        <Text mt={4}>Discover the benefits of attendance taking.</Text>
      </Box>
      <Box p={8} backgroundColor={'#FBFBFB'} borderWidth="1px" borderRadius="lg" borderColor="#FBFBFB" boxShadow="sm" maxWidth="2xl" width="full">
        <FormControl id="demo-form">
        <Flex align="center" pb={'1.4rem'}>
          <Text fontSize="2xl" fontWeight="bold">Request a Demo</Text>
          <Icon as={MdPlayCircleOutline} w={6} h={6} color='blue.500' ml={2} />
        </Flex>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Your Name" />
          <FormLabel mt={4}>Telephone</FormLabel>
          <Input placeholder="Your Telephone Number" />
          <FormLabel mt={4}>Email</FormLabel>
          <Input placeholder="Your Email" />
          <FormLabel mt={4}>Message</FormLabel>
          <Textarea placeholder="Do you want to say anything to us?" />
          <Flex justify="center" mt={4}>
              <Button width="full" colorScheme="blue">Get Demo</Button>
            </Flex>
        </FormControl>
      </Box>
    </Flex>
    </Box>
    </>
  );
}