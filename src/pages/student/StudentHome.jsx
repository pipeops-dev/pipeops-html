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
  Input,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { color } from "framer-motion";
import { useGetAttendanceTabQuery } from "../../features/attendanceTab/studentAttendanceApiSlice";

import {
  MdMoreVert,
  MdLockOutline,
  MdEdit,
  MdCalculate,
  MdLockOpen,
} from "react-icons/md";

export default function StudentHome() {
  const { isOpen:isAttendance, onOpen:onAttendance, onClose:closeAttendance } = useDisclosure();
  const [name, setName] = useState('');
  const [matric, setMatric] = useState('');
  const [department, setDepartment] = useState('');
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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, matric, department });
    onClose(); // Close modal after form submission
  };
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
                    <Card variant={"elevated"}  backgroundColor={course.Open ? "white" : "#D3D3D3"} onClick={course.Open ? onAttendance : undefined} >
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
                  </div>
                );
              })}
        <Modal isOpen={isAttendance} onClose={closeAttendance}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student Information</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} placeholder="e.g John Doe" onChange={(e) => setName(e.target.value)} />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Matric Number</FormLabel>
                <Input value={matric} placeholder="e.g 00000" onChange={(e) => setMatric(e.target.value)} />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Department</FormLabel>
                <Input value={department} placeholder="e.g Your Department" onChange={(e) => setDepartment(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
              <Button variant="ghost" onClick={closeAttendance}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}
