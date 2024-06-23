import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectLecturerById } from "./lecturersApiSlice";
import { Button } from "@chakra-ui/react";
import {
    Tr,Td
  } from '@chakra-ui/react'

const Lecturer = ({ lecturerId }) => {
  const lecturer = useSelector((state) =>
    selectLecturerById(state, lecturerId)
  );

  const navigate = useNavigate();

  if (lecturer) {
    const handleEdit = () => navigate(`/lecturers/${lecturerId}`);

    return (
      <Tr>
        <Td>{lecturer.firstname}</Td>
        <Td>{lecturer.lastname}</Td>
        <Td>{lecturer.email}</Td>

        <Td>
          <Button onClick={handleEdit}>edit</Button>
        </Td>
      </Tr>
    );
  } else return null;
};
export default Lecturer;
