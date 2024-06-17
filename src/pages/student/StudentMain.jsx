import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import nodata from "../../images/no-data.png";
import { color } from "framer-motion";
import { useUpdateAttendanceTabMutation } from "../../features/attendanceTab/studentAttendanceTabApiSlice";
export default function StudentMain() {
  const [updateAttendanceTab, { isLoading, isSuccess, isError, error }] =
    useUpdateAttendanceTabMutation();
  const [attendanceCode, setAttendanceCode] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);
  useEffect(() => {
    if (isLoading) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) {
      setAttendanceCode("");
      navigate(`/student/${id}`);
    }
  }, [isSuccess, navigate]);
  const handleSubmit = async (e) => {
    console.log("submitted", attendanceCode, id);
    if (attendanceCode && id) {
      try {
        await updateAttendanceTab({ id, attendanceCode });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  return (
    <div>
      <Container mt={"0px"}>
        <Flex justify={"center"}>
          <Box w={"500px"}>
            <img src={nodata} alt="no-data" />
          </Box>
        </Flex>
        <Text textAlign={"center"} fontWeight={"semibold"} mt={"-80px"}>
          You are yet to join an attendance tab
        </Text>
        <Flex justify={"center"} mt={"20px"} gap={"5"}>
          <Button
            mt={"10px"}
            w={"50%"}
            colorScheme="red"
            color={"white"}
            onClick={onOpen}
          >
            Join
          </Button>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join an attendance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={"10px"}>
              Ask your lecturer for the course attendance tab, then enter it
              below:
            </Text>
            <Input
              mb={"10px"}
              placeholder="attendance code"
              value={attendanceCode}
              onChange={(e) => setAttendanceCode(e.target.value)}
            />
            <Text>
              If you have an issue joining the attendance, go to the{" "}
              <Link to="/about" style={{ color: "blue" }}>
                Help guide
              </Link>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
