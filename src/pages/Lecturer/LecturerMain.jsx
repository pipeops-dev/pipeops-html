import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
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
  Text,
} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import nodata from "../../images/no-data.png";
import { color } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAddNewAttendanceTabMutation } from "../../features/attendanceTab/lecturerAttendanceTabApiSlice";
export default function LecturerMain() {
  const [addNewAttendanceTab] = useAddNewAttendanceTabMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [lecturerId, setLecturerId] = useState(id);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);
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
  const handleSubmit = async (e) => {
    console.log("submitted", lecturerId, courseCode, courseName);
    if (courseCode && courseName) {
      try {
        await addNewAttendanceTab({ courseCode, courseName, lecturerId });
        setCourseCode("");
        setCourseName("");
        onCreateClose();
        navigate(`/lecturer/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an attendance card</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Course code</FormLabel>
              <Input placeholder="BME 201"  onChange={(e) => {
                  setCourseCode(e.target.value.toUpperCase());
                }} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Course title</FormLabel>
              <Input placeholder="General anatomy" 
              onChange={(e) => {
                setCourseName(e.target.value.toUpperCase());
              }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}
            onClick={() => {
              handleSubmit();
            }}
            >
              Create
            </Button>
            <Button onClick={onCreateClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container mt={"0px"}>
        <Flex justify={"center"}>
          <Box w={"500px"}>
            <img src={nodata} alt="no-data" />
          </Box>
          <Text>You are yet to create an attendance tab</Text>
        </Flex>
      </Container>
      <Flex justify={"center"} mt={"20px"} gap={"5"}>
        <Button colorScheme="red" onClick={onCreateOpen}>
          Create
        </Button>
        <Button colorScheme="white" color={"red"} onClick={onJoinOpen}>
          Join
        </Button>
      </Flex>
    </div>
  );
}