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
  TableContainer
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function AttendanceInfo() {
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
    </div>
  );
}
