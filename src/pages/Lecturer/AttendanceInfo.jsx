import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Spinner,
  Center,
  Button,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function AttendanceInfo() {
    const {
        isOpen,
        onOpen,
        onClose
      } = useDisclosure();
     
      const [name, setName] = useState("");
      const [matricNumber, setMatricNumber] = useState("");
      const [department, setDepartment] = useState("");
  const [attendance, setAttendance] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const fetchAttendanceById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3500/attendance/${id}`
      );
      setAttendance(response.data); // This will log the student's details
    } catch (error) {
      console.error("Error fetching student:", error.response.data);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAttendanceById(id);
    }
  }, [id]);

  if (!attendance) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, matricNumber, department });
    onClose();
  };

  return (
    <div>
        <TableContainer>
      <Table variant="striped" colorScheme="grey">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Matric Number</Th>
            <Th>Department</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody textAlign={'center'}>
          {attendance.students.map((student) => (
            <Tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.matricNumber}</Td>
              <Td>{student.department}</Td>
              <Td>
                <Button
                  onClick={() => handleDelete(student._id)}
                  size="sm"
                  colorScheme="red"
                >
                  <Icon as={MdDelete} />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
      <Button colorScheme="green" m='1rem'><Icon as={MdEdit } onClick={onOpen} />
        Add</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Student Information</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
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
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit">
                      Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
    </div>
  );
}
