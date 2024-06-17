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
  Center,
  Spinner,
  Heading,
  Divider,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useClipboard, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { color } from "framer-motion";
import { useGetAttendanceTabQuery } from "../../features/attendanceTab/lecturerAttendanceTabApiSlice";
import { useToggleOpenAttendanceTabMutation } from "../../features/attendanceTab/lecturerAttendanceTabApiSlice";
import { useAddNewAttendanceMutation } from "../../features/attendance/lecturerAttendanceApiSlice";
import {
  MdContentCopy,
  MdMoreVert,
  MdLockOutline,
  MdEdit,
  MdCalculate,
  MdLockOpen,
  MdOutlineAddCircleOutline,
  MdViewList,
} from "react-icons/md";
import copy from "copy-to-clipboard";

export default function LecturerHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { lecturerId } = useParams();
  const navigate = useNavigate();
  const [attendanceId, setAttendanceId] = useState("");
  const toast = useToast();
  const {
    data: attendanceTabs,
    isLoading,
    isError,
  } = useGetAttendanceTabQuery(lecturerId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [toggleOpenAttendanceTab, { isSuccess }] =
    useToggleOpenAttendanceTabMutation();
  const [addNewAttendance] = useAddNewAttendanceMutation();
  useEffect(() => {
    if (!isLoading && (!attendanceTabs || attendanceTabs.ids.length === 0)) {
      navigate(`/lecturer/${lecturerId}/new`);
    }
  }, [isLoading, attendanceTabs, navigate, lecturerId]);
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const handleCardClick = async (course) => {
    console.log(course.id)
    try {
      await toggleOpenAttendanceTab({ id:course.id });
      if (course.Open) {
        toast({
          position: "top-right",
          title: 'Course Closed',
          description: `${course.courseCode} is closed.`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
        position: "top-right",
          title: 'Course Open',
          description: `${course.courseCode} is open.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (id) => {
    try{
      await addNewAttendance({ attendanceTabId: id, lecturerId });
      console.log(lecturerId, id)
      onClose()
      toast({
        position: "top-right",
        title: "Attendance Created",
        description: `The attendance has been created successfully.`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    }catch(error){
      console.log(error);
    }
  };

  const viewAttendance = (id) => {  
    navigate(`/lecturer/${lecturerId}/attendance/${id}`);
  }

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
                    <Card variant={"elevated"}>
                      <CardHeader>
                        <Flex>
                          <Heading fontSize={"2rem"} pl={"10px"} mt={"15px"}>
                            {course.courseCode}
                          </Heading>
                          <Spacer />
                          <Menu>
                            <MenuButton>
                              {" "}
                              <IconButton
                                variant={"ghost"}
                                size={"lg"}
                                icon={<MdMoreVert />}
                              />
                            </MenuButton>
                            <MenuList ml={"-160px"} mt={"-10px"}>
                              <MenuItem
                                icon={<MdOutlineAddCircleOutline />}
                                onClick={onOpen}
                              >
                                Create Attendance
                              </MenuItem>
                              <MenuItem icon={<MdViewList />} onClick={() => viewAttendance(id)} >
                                View Attendance
                              </MenuItem>
                              <MenuItem icon={<MdCalculate />}>
                                Calculate Attendance
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </CardHeader>
                      <CardBody fontSize={"1.3rem"}>
                        {course.courseName}
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Spacer />
                        <HStack>
                          <IconButton
                            onClick={() => handleCardClick(course)}
                            variant={"ghost"}
                            icon={
                              course.Open ? (
                                <MdLockOpen color="green" />
                              ) : (
                                <MdLockOutline />
                              )
                            }
                            size={"lg"}
                          />

                          <IconButton
                            onClick={() => {
                              copy(course.attendanceCode);
                              toast({
                                position: "top-right",
                                title: "Attendance Code Copied",
                                description: `The attendance code ${course.attendanceCode} has been copied to your clipboard. Do well to send it to your students.`,
                                status: "success",
                                duration: 10000,
                                isClosable: true,
                              });
                            }}
                            variant={"ghost"}
                            size={"lg"}
                            icon={<MdContentCopy />}
                          />
                        </HStack>
                      </CardFooter>
                    </Card>
                    <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Create Attendance</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <Text fontWeight={"bold"}>
                        An atttendance is about to be created. Please don't
                        forget to open the attendance tab so your student would
                        have access to submit their attendance.
                      </Text>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} type="submit" onClick={() => handleClick(id)}>
                        Create
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>;
                  </div>
                );
                
              })}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}
