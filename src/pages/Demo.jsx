import React from 'react'
import Footer from '../component/Footer'
import { Box, Center, Flex, HStack, Heading, Text, Container, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import logo from '../images/logo-revamp.svg'
import logo2 from "../images/logo.png";
import { NavLink } from "react-router-dom";
export default function Demo() {
    const firstRegister = {
        bgColor: "#213655",
        color: "white",
        ":hover": {
          bgColor: "#f2575d",
          borderRadius: "10px",
        },
        borderRadius: "0",
      };
    
      const secondRegister = {
        color: "#213655",
        border: "3px solid #213655 ",
        bgColor: "transparent",
        borderRadius: "0",
        ":hover": {
          bgColor: "#f2575d",
          color: "white",
          border: "3px solid #f2575d ",
          borderRadius: "10px",
        },
      };
  return (
    <><Box m={'1em'}>
          <img src={logo2} width={'5%'} alt="logo" />
      </Box><Flex
        as="section"
        flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
        align={"center"}
        justify={{ base: "center", md: "center", lg: "space-between" }}
        gap={{ base: 0, lg: 5 }}
        my={"2em"}
      >
        <Container
          my={{ base: "3.5rem", md: "5rem", lg: "8.75rem", xl: "5rem" }}
          px={{ base: "1.25rem", lg: "1.875rem", xl: "1.875rem" }}
        >
          <Heading
            color={"#213655"}
            textAlign={{ base: "center", lg: "left", xl: "left" }}
            pb={"15px"}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "5xl" }}
          >
            Student attendance process doesn't get any easier than this.
          </Heading>
           
          <Text
            pb={"1.25rem"}
            textAlign={{ base: "center", lg: "left", xl: "left" }}
          >
            {" "}
            Our platform makes getting, submitting and monitoring your students' attendance as easy as a click of a button on your device.
          </Text>
          <Flex
            gap={5}
            flexDir={{ base: "column", md: "column", lg: "row", xl: "row" }}
          >
            <Button sx={firstRegister}>
              <NavLink to={"register-institution"}>
                Register your Institution
              </NavLink>
            </Button>
            <Button sx={secondRegister}>
              <NavLink to={"signin"}>Signup as Tutor/Student</NavLink>
            </Button>
          </Flex>
        </Container>
        <Container
         
          w={"auto"}
        >
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" placeholder="Name" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" />
          </FormControl>
        </Container>
      </Flex></>
  )
}
