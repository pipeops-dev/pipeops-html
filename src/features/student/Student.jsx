import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectStudentById } from "./studentsApiSlice";
import { Button } from "@chakra-ui/react";
import {
    Tr,Td
  } from '@chakra-ui/react'

const Student = ({ studentId }) => {
  const student = useSelector((state) =>
    selectStudentById(state, studentId)
  );

  const navigate = useNavigate();

  if (student) {
    const handleEdit = () => navigate(`/students/${studentId}`);
    return (
      <Tr>
        <Td>{student.firstname}</Td>
        <Td>{student.lastname}</Td>
        <Td>{student.email}</Td>

        <Td>
          <Button onClick={handleEdit}>edit</Button>
        </Td>
      </Tr>
    );
  } else return null;
};
export default Student;
