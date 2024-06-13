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
import { useEffect } from "react";
import nodata from "../../images/no-data.png";
import { color } from "framer-motion";
import { Link } from "react-router-dom";
export default function LecturerMain() {
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
              <Input placeholder="BME 201" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Course title</FormLabel>
              <Input placeholder="General anatomy" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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