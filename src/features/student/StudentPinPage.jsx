import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  PinInput,
  PinInputField,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import logo from "../../images/logo-revamp.svg";
import { useNavigate, useParams } from "react-router-dom";


import {useUpdatePinMutation} from "./studentsApiSlice";
const StudentPinPage = () => {
  const [updatePin, { isLoading, isSuccess, isError, error }] = useUpdatePinMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [pin, setPin] = useState("");
  const [validPin, setValidPin] = useState("");
  const regex = /^\d{4}$/;

  useEffect(() => {
    if (regex.test(pin)) {
      setValidPin(pin);
    }
  }, [pin]);

  useEffect(() => {
    if (isSuccess) {
      setPin("");
      navigate(`/student/${id}`);
    }
  }, [isSuccess, navigate]);


 
  

  const handleInputChange = (value) => {
    setPin(value);
  };

  const canSave = Boolean(validPin);

  const handleSubmit = async (e) => {
    console.log('submitted', id, pin)
    if(canSave){
      try{
          await updatePin({id ,pin: validPin})
      }catch(error){

      }
    }
    
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDir={"column"}
    >
      <Box w={"5%"}>
        <img src={logo} alt="Logo" />
      </Box>
      <Heading pb={3}>Create a 4-digit Pin</Heading>
      <Text fontSize="xl" mb={5} textAlign={"center"}>
        A pin allows you to submit your attendance
      </Text>
      <Box p={5}>
        <Text mb={5}>Please input your PIN:</Text>
        <HStack mb={6}>
          <PinInput onChange={handleInputChange}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Flex justifyContent="center" alignItems="center" mb={5}>
          <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default StudentPinPage;
