import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex, // Import Flex from Chakra UI
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  PinInput,
  PinInputField,
  useDisclosure,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useVerifyPinMutation } from "../../features/student/studentsApiSlice";
import { useUpdateAttendanceMutation } from "../../features/attendance/studentAttendanceApiSlice";
import { useParams, useNavigate } from "react-router-dom";
export default function AttendanceForm() {
  
  const [
    verifyPin,
    {
      isLoading: isLoadingPin,
      isSuccess: isPinSuccess,
      isError: isErrorToggle,
    },
  ] = useVerifyPinMutation();
  const [
    updateAttendance,
    { isLoading: isLoadingAttendance, isSuccess: isAttendanceSuccess },
  ] = useUpdateAttendanceMutation();
  const [name, setName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [pin, setPin] = useState("");
  const { id, attendanceId } = useParams();
  const [studentId, setStudentId] = useState(id)
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen: isPin, onOpen: onPin, onClose: closePin } = useDisclosure();

  const handleSubmit = async () => {
    try {
      await verifyPin({ id, pin });
      console.log({ pin });
      closePin();
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("INVALID PIN");
        toast({
          position: "top",
          title: "Auuchh!",
          description: errMsg,
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      } else {
        setErrMsg(err.data?.message);
      }

      toast({
        position: "top",
        title: "Auuchh!",
        description: errMsg,
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);
  useEffect(() => {
    if (isPinSuccess) {
      updateAttendance({
        attendanceId,
        studentId,
        name,
        matricNumber,
        department,
      });
      console.log({ attendanceId, studentId, name, matricNumber, department });
      navigate(`/student/${id}`);
      toast({
        title: "Pin Verified",
        description: "Your attendance has been submitted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setPin("");
      setDepartment("");
      setName("");
      setMatricNumber("");
    }
  }, [isPinSuccess, navigate]);
  useEffect(() => {
    if (isErrorToggle) {
      toast({
        title: "Wrong Pin",
        description: "Please, input your correct pin",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isErrorToggle]);
  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Container centerContent p={{ base: 4, md: 8 }}>
          <VStack
            spacing={4}
            w="full"
            maxW="md"
            bg="white"
            rounded="xl"
            boxShadow="lg"
            p={6}
          >
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                placeholder="e.g John Doe"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Matric number</FormLabel>
              <Input
                value={matricNumber}
                placeholder="e.g 00000"
                autoComplete="off"
                onChange={(e) => setMatricNumber(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Department</FormLabel>
              <Input
                value={department}
                placeholder="e.g Your Department"
                autoComplete="off"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" mr={3} onClick={onPin} type="submit">
              Submit
            </Button>
          </VStack>
        </Container>
        <Modal isOpen={isPin} onClose={closePin} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Your 4-Digit Pin</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack justify="center">
                <PinInput value={pin} onChange={setPin} size="lg">
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </ModalBody>
            <ModalFooter>
              {!isLoadingPin ? (
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading
                  colorScheme="teal"
                  variant="solid"
                ></Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
