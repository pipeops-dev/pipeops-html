import {
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  Flex,
  SimpleGrid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Icon,
  Heading,
  Divider,
  HStack,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  PinInput,
  PinInputField,
  Input,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { color } from "framer-motion";
import { useGetAttendanceTabQuery } from "../../features/attendanceTab/studentAttendanceTabApiSlice";
import { useVerifyPinMutation } from "../../features/student/studentsApiSlice";
import { useUpdateAttendanceMutation } from "../../features/attendance/studentAttendanceApiSlice";
import {
  MdMoreVert,
  MdLockOutline,
  MdEdit,
  MdCalculate,
  MdLockOpen,
} from "react-icons/md";

export default function StudentHome() {
  const [verifyPin, { isLoading: isLoadingPin, isSuccess: isPinSuccess }] =
    useVerifyPinMutation();
    const [updateAttendance, { isLoading: isLoadingAttendance, isSuccess: isAttendanceSuccess }] =
    useUpdateAttendanceMutation();
  const {
    isOpen: isAttendance,
    onOpen: onAttendance,
    onClose: closeAttendance,
  } = useDisclosure();
  const toast = useToast();
  const { isOpen: isPin, onOpen: onPin, onClose: closePin } = useDisclosure();
  const [name, setName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [pin, setPin] = useState("");
  const { id } = useParams();
  const [studentId, setStudentId] = useState(id);
  const navigate = useNavigate();
  const {
    data: attendanceTabs,
    isLoading,
    isError,
  } = useGetAttendanceTabQuery(studentId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  useEffect(() => {
    if (!isLoading && (!attendanceTabs || attendanceTabs.ids.length === 0)) {
      navigate(`/student/${studentId}/new`);
    }
  }, [isLoading, attendanceTabs, navigate, studentId]);

  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const handleSubmit = (attendanceId) => {
    //if(isPinSuccess){
      //updateAttendance({ attendanceId, studentId, name, matricNumber, department });
      //console.log({ attendanceId, studentId, name, matricNumber, department });
    //}
    // Handle form submission logic here
    
    closeAttendance();
    onPin(); // Close modal after form submission
  };
  const handleSubmitPin = () => {
    try {
      verifyPin({ id: studentId, pin });
      setPin("");
      //setDepartment("");
      //setName("");
      //setMatricNumber("");
      // Handle form submission logic here
      console.log({ pin });
      closePin(); // Close modal after form submission
    } catch (error) {
      console.error("Error verifying pin", error);
    }
  };


  useEffect(() => {
    if (isPinSuccess) {
      toast({
        title: "Pin Verified",
        description: "You can now submit your attendance",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  , [isPinSuccess]);
  return (
    <div>
      {isLoading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <div>
          <SimpleGrid
            columns={{ base: "1", lg: "3", xl: "3" }}
            mx={"20px"}
            gap={"10"}
            mt={"30px"}
          >
            {attendanceTabs &&
              attendanceTabs.ids.map((id, index) => {
                const course = attendanceTabs.entities[id];

                return (
                  <div key={index}>
                    <Card
                      variant={"elevated"}
                      backgroundColor={course.Open ? "white" : "#D3D3D3"}
                      onClick={course.Open ? onAttendance : undefined}
                    >
                      <CardHeader>
                        <Flex>
                          <Heading fontSize={"2rem"} pl={"10px"} mt={"15px"}>
                            {course.courseCode}
                          </Heading>
                          <Spacer />
                        </Flex>
                      </CardHeader>
                      <CardBody fontSize={"1.3rem"}>
                        {course.courseName}
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Text fontSize={"1.3rem"}>
                          LECTURER-IN-CHARGE: {course.lecturerName}
                        </Text>
                        <Spacer />
                        <HStack>
                          <IconButton
                            variant={"ghost"}
                            icon={
                              course.Open ? (
                                <MdLockOpen color="green" />
                              ) : (
                                <MdLockOutline color="red" />
                              )
                            }
                            size={"lg"}
                          />
                        </HStack>
                      </CardFooter>
                    </Card>
                    <Modal
                      isOpen={isAttendance}
                      onClose={closeAttendance}
                      isCentered
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Student Information</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(course.attendanceId)}}>
                          <ModalBody>
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
                              <FormLabel>MatricNumber Number</FormLabel>
                              <Input
                                value={matricNumber}
                                placeholder="e.g 00000"
                                autoComplete="off"
                                onChange={(e) =>
                                  setMatricNumber(e.target.value)
                                }
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
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                              Submit
                            </Button>
                            <Button variant="ghost" onClick={closeAttendance}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </form>
                      </ModalContent>
                    </Modal>
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
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleSubmitPin}
                          >
                            Submit
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                );
              })}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}
