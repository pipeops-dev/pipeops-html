import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useCalculateAttendanceMutation } from "../../features/attendance/studentAttendanceApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Button,
  HStack,
  Spacer,
  Heading,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { MdDownload, MdCalculate } from "react-icons/md";
import axios from "axios";
const CalculateAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]); // Step 1: State to store the result
  const { lecturerId, id } = useParams();
  const [attendanceTabId, setAttendanceTabId] = useState(id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [calculateAttendance, { isLoading, isSuccess }] =
    useCalculateAttendanceMutation();

  const fetchAttendancePercentage = async () => {
    try {
      // Replace 'your_api_endpoint' with the actual endpoint URL
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3500/attendance/student",
        {
          lecturerId: lecturerId,
          attendanceTabId: attendanceTabId,
        }
      );

      // Handle response here
      setAttendanceData(response.data);
      console.log(attendanceData.attendancePercentages);
    } catch (error) {
      // Handle error here
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleClick = async () => {
    fetchAttendancePercentage(lecturerId, attendanceTabId);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      attendanceData.attendancePercentages
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i < wbout.length; ++i) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }

    const blob = new Blob([buf], { type: "application/octet-stream" });
    saveAs(blob, "data.xlsx");
  };

  return (
    <div>
      <Card m={3}>
        <CardHeader>
            <Heading> Calculate an attendance</Heading>
           </CardHeader>
        <CardBody>Calculating an attendance allows you to see the percentage of your students attendance. You can access the calculated attendance as an excel file</CardBody>
        <Divider/>
        <CardFooter>
            <Spacer/>
          <HStack>
            {!loading ? (
              <Button onClick={handleClick} colorScheme="red">
                Calculate
                <Icon as={MdCalculate} />
              </Button>
            ) : (
              <Button w={10} isLoading></Button>
            )}
            <Button onClick={handleDownload} colorScheme="blue">
              Download
              <Icon as={MdDownload} />
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CalculateAttendance;
