import React from "react";
import {
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Divider,
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../images/logo.png";
import mockup from "../images/mockup.png";
import { useNavigate } from "react-router-dom";
import { MdPlayCircleOutline } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Demo() {
  const toast = useToast();
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const reRoute = () => {
    navigate("/");
  };

  const createDemo = async (demoData) => {
    try {
      const response = await axios.post(
        "https://sams-backend-1.onrender.com/demo",
        demoData
      );
      console.log("Demo created successfully:", response.data);
    } catch (error) {
      console.error("Error creating demo:", error.response.data);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const demoData = {
      name,
      email,
      telephone,
      message,
    };
    createDemo(demoData)
      .then(() => {
        setName("");
        setEmail("");
        setTelephone("");
        setMessage("");
        onOpen()
        toast({
          position: "top-right",
          title: "Demo Request Successful",
          description: "We will get back to you shortly",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("Error creating demo");
      });
  };

  const closeButton =() =>{
    navigate('/')
  }

  return (
    <>
      <Box backgroundColor={"white"} w={"100vw"}>
        <Box py={"1.5rem"} px={"1.5rem"} onClick={reRoute}>
          <img src={logo} alt="logo" />
        </Box>
        <Divider />
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-around"
          p={8}
        >
          <Box ml={7} mb={8}>
            <Text fontSize="xl" fontWeight="bold">
              Welcome to Our Demo
            </Text>
            <Text mt={4} pr={6}>
              Discover the easy way of taking, tracking and monitoring your
              students' attendance in real time with S.A.M.S
            </Text>
            <Box maxWidth={'2xl'} mt={'1.4rem'}>
              <img src={mockup} alt="mockup" />
            </Box>
          </Box>
          <Box
            p={8}
            backgroundColor={"#FBFBFB"}
            borderWidth="1px"
            borderRadius="lg"
            borderColor="#FBFBFB"
            boxShadow="sm"
            maxWidth="2xl"
            width="full"
          >
            <FormControl id="demo-form">
              <Flex align="center" pb={"1.4rem"}>
                <Text fontSize="2xl" fontWeight="bold">
                  Request a Demo
                </Text>
                <Icon
                  as={MdPlayCircleOutline}
                  w={6}
                  h={6}
                  color="blue.500"
                  ml={2}
                />
              </Flex>
              <FormLabel>Name:</FormLabel>
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel mt={4}>Telephone:</FormLabel>
              <Input
                placeholder="Your Telephone Number"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <FormLabel mt={4}>Email:</FormLabel>
              <Input
                value={email}
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel mt={4}>Message:</FormLabel>
              <Textarea
                placeholder="Do you want to say anything to us?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Flex justify="center" mt={4}>
                <Button
                  width="full"
                  colorScheme="blue"
                  type="subit"
                  onClick={handleSubmit}
                >
                  Get Demo
                </Button>
              </Flex>
            </FormControl>
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hi there!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <Text>You can play around the attendance process between lecturer and student. More functionalities would roll out soon.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeButton}>
              Let's go
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </>
  );
}
