import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex, // Import Flex from Chakra UI
  Box,
  Center,
  Spinner,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useGetLecturerAttendanceQuery } from "../../features/attendance/lecturerAttendanceApiSlice";
export default function AttendanceList() {
  const { lecturerId, attendanceTabId } = useParams();
  const navigate = useNavigate();
  const {
    data: attendances,
    isLoading,
    isError,
  } = useGetLecturerAttendanceQuery(
    { attendanceTabId, lecturerId },
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const singleAttendance = (id) => {
    console.log(id);
    navigate(`/lecturer/${lecturerId}/single-attendance/${id}`);

  }
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);
  return (
    <div>
      {isLoading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <div>
          <SimpleGrid
            columns={{ base: "1", lg: "3", xl: "3" }}
            mx={"20px"}
            gap={"10"}
            mt={"30px"}
          >
            {attendances &&
              attendances.ids.map((id, index) => {
                const attendance = attendances.entities[id];

                return (
                  <div key={index}>
                    <Card variant={"elevated"} onClick={() => singleAttendance(id)}>
                      <CardHeader>
                        <Flex>
                          <Heading fontSize={"2rem"} pl={"10px"} mt={"15px"}>
                            Attendance
                          </Heading>
                        </Flex>
                      </CardHeader>
                      <CardBody fontSize={"1.6rem"}>
                        <Flex>
                        Created: {new Date(attendance.createdAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }
                        )}
                        <Spacer/>
                        {attendance.present} present
                        </Flex>
                      </CardBody>

                      <CardFooter></CardFooter>
                    </Card>
                  </div>
                );
              })}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}
