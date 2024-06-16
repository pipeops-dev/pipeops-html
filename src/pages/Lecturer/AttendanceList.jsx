import React from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex, // Import Flex from Chakra UI
  Box
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function AttendanceList() {

    const {lecturerId, id} = useParams();

    useEffect(() => {
        document.body.classList.add("bg-color");
      }, []);
  return (
    <>
   hi
    
    </>
  );
}