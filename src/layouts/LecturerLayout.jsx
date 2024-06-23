import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import {
  MdAnalytics,
  MdBook,
  MdContactSupport,
  MdHome,
  MdSettings,
} from "react-icons/md";
import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import logo from "../images/logo.png";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useSendLogoutMutation } from "../features/lecturerAuth/lecturerAuthApiSlice";
import { useGetLecturerByIdQuery } from "../features/lecturerAuth/lecturerAuthApiSlice";
import { useAddNewAttendanceTabMutation } from "../features/attendanceTab/lecturerAttendanceTabApiSlice";
import { useNavigate, useParams } from "react-router-dom";
export default function LecturerLayout() {
  const [addNewAttendanceTab, {isSuccess:isSuccessAttendanceTab, isLoading:isLoadingAttendanceTab}] = useAddNewAttendanceTabMutation();
  const navigate = useNavigate();
  const { lecturerId } = useParams();
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const toast = useToast();
  const { data: lecturer } = useGetLecturerByIdQuery(lecturerId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
 
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const [display, setDisplay] = useState("none");
  const [sendLogout, { isSuccess, error }] = useSendLogoutMutation();

  const handleSubmit = async () => {
    if (courseCode && courseName) {
      try {
        await addNewAttendanceTab({ courseCode, courseName, lecturerId });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isSuccessAttendanceTab){ 
      setCourseCode("");
      setCourseName("");
      navigate(`/lecturer/${lecturerId}`);
      onCreateClose();
      toast({
        position: "top",
        title: "Attendance tab created.",
        description: "Do not forget to share the code with your students by clicking on the clipboard icon.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } ;
  }, [isSuccessAttendanceTab, navigate]);
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isJoinOpen,
    onOpen: onJoinOpen,
    onClose: onJoinClose,
  } = useDisclosure();

  const initialRef = useRef(null);
  

  return (
    <div>
      <Modal isOpen={isJoinOpen} onClose={onJoinClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join an attendance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={"10px"}>
              Ask your fellow lecturer for the course attendance tab, then enter
              it below:
            </Text>
            <Input mb={"10px"} placeholder="attendance code" />
            <Text>
              If you have an issue joining the attendance, go to the{" "}
              <Link to="/about" style={{ color: "blue" }}>
                Help guide
              </Link>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onJoinClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onJoinClose}>
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isCreateOpen}
        onClose={onCreateClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an attendance card</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Course code</FormLabel>
              <Input
                ref={initialRef}
                placeholder="BME 201"
                onChange={(e) => {
                  setCourseCode(e.target.value.toUpperCase());
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Course name</FormLabel>
              <Input
                placeholder="General anatomy"
                onChange={(e) => {
                  setCourseName(e.target.value.toUpperCase());
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {!isLoadingAttendanceTab ? 
              <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleSubmit();
              }}
            >
              Create
            </Button>
            :
            <Button colorScheme="blue" mr={3} isLoading>
              loading 
            </Button>
            
            }
            
            <Button onClick={onCreateClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid templateColumns={"repeat(6, 1fr)"}>
        <Box display={{ base: "none", lg: "grid", xl: "grid" }}>
          <GridItem
            as={"aside"}
            colSpan={{ base: "0", lg: "2", xl: "1" }}
            minHeight={"100vh"}
            borderRight={"2px solid black"}
          >
            <Flex mt={"40px"} ml={"10px"}>
              <Text fontWeight={"extrabold"} fontSize={"2xl"}>
                Hello! {lecturer?.lastname}
              </Text>
            </Flex>
            <Flex justify={"center"}>
              <List spacing={10} mt={"70px"} cursor={"pointer"}>
                <Link to={"home"}>
                  <ListItem fontWeight={"bold"} cursor={"pointer"} pl={"20px"}>
                    <ListIcon as={MdHome} boxSize={5} />
                    Home
                  </ListItem>
                </Link>       
                          <ListItem fontWeight={"bold"} cursor={"pointer"}>
                            <ListIcon as={MdBook} boxSize={5} />
                            Course
                          </ListItem>
                        <ListItem fontWeight={"bold"} cursor={"pointer"}>
                          <ListIcon as={MdAnalytics} boxSize={5} />
                          Insight
                        </ListItem>
                <ListItem fontWeight={"bold"} cursor={"pointer"} pl={"20px"}>
                  <ListIcon as={MdSettings} boxSize={5} />
                  Setting
                </ListItem>
                <ListItem fontWeight={"bold"} cursor={"pointer"} pl={"20px"}>
                  <ListIcon as={MdContactSupport} boxSize={5} />
                  Support and Help
                </ListItem>
                <ListItem>
                  <Button
                    colorScheme="red"
                    p={"10px"}
                    w={"75%"}
                    onClick={sendLogout}
                  >
                    Logout
                  </Button>
                </ListItem>
              </List>
            </Flex>
          </GridItem>
        </Box>
        <Box
          display={display}
          pos={"fixed"}
          zIndex={1000}
          bgColor={"white"}
          w={"250px"}
        >
          <GridItem
            as={"aside"}
            colSpan={{ base: "0", lg: "2", xl: "1" }}
            minHeight={"100vh"}
            borderRight={"2px solid black"}
          >
            <Flex mt={"60px"} ml={"10px"}>
              <Text fontWeight={"extrabold"} fontSize={"2xl"}>
                Hello! {lecturer?.firstname}
              </Text>
            </Flex>
            <Flex justify={"center"}>
              <List spacing={10} mt={"70px"} cursor={"pointer"}>
                <Link to={"/"}>
                  <ListItem fontWeight={"bold"} cursor={"pointer"} pl={"20px"}>
                    <ListIcon as={MdHome} boxSize={5} />
                    Home
                  </ListItem>
                </Link>
              
                        <ListItem fontWeight={"bold"} cursor={"pointer"}>
                          <ListIcon as={MdBook} boxSize={5} />
                          Courses
                        </ListItem>
               
                        <ListItem fontWeight={"bold"} cursor={"pointer"}>
                          <ListIcon as={MdAnalytics} boxSize={5} />
                          Insight
                        </ListItem>
                 

                <ListItem fontWeight={"bold"} cursor={"pointer"} pl={"20px"}>
                  <ListIcon as={MdSettings} boxSize={5} />
                  Setting
                </ListItem>
                <ListItem fontWeight={"bold"} cursor={"pointer"} pl={"20px"}>
                  <ListIcon as={MdContactSupport} boxSize={5} />
                  Support and Help
                </ListItem>
                <ListItem>
                  <Button colorScheme="red" p={"10px"} w={"75%"}>
                    Logout
                  </Button>
                </ListItem>
              </List>
            </Flex>
          </GridItem>
        </Box>
        <GridItem as={"main"} colSpan={{ base: "6", lg: "5", xl: "5" }}>
          <Flex borderBottom={"1px solid grey"} p={"10px"} align={"center"}>
            <Box
              display={{ base: "flex", md: "flex", lg: "none", xl: "none" }}
              //mr={{ base: "10px" }}
              zIndex={2000}
            >
              <Hamburger
                rounded
                direction="right"
                duration={0.5}
                onToggle={(toggled) => {
                  if (toggled) {
                    setDisplay("grid");
                  } else {
                    setDisplay("none");
                  }
                }}
              />
            </Box>
            <Box ml={{ base: "10px", lg: "25px", xl: "25px" }}>
              <img src={logo} alt="logo" />
            </Box>
            <Spacer />
            <Flex
              align={"center"}
              gap={{ base: 3, lg: 10, xl: 10 }}
              mr={{ base: "10px", md: "50px", lg: "130px", xl: "150px" }}
            >
              
              <Menu>
                <MenuButton>
                  <IconButton
                    variant={"ghost"}
                    colorScheme="white"
                    icon={<AddIcon />}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onCreateOpen}>Create Attendance</MenuItem>
                  <MenuItem onClick={onJoinOpen}>Join Attendance</MenuItem>
                </MenuList>
              </Menu>

              <Wrap>
                <WrapItem>
                  <Avatar
                    name={`${lecturer?.firstname} ${lecturer?.lastname}`}
                    src={`https://rosy-group-premium-plant-production.pipeops.app/${lecturer?.pic}`}
                  />
                </WrapItem>
              </Wrap>
            </Flex>
          </Flex>
          <Outlet />
        </GridItem>
      </Grid>
    </div>
  );
}
