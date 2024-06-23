import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
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
  Divider,
  Icon,
} from "@chakra-ui/react";
import { MdDelete, MdVisibility } from "react-icons/md";
import { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useGetLecturerAttendanceQuery } from "../../features/attendance/lecturerAttendanceApiSlice";
export default function AttendanceList() {
  const { lecturerId, id } = useParams();
  const navigate = useNavigate();
  const attendanceTabId = id;
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
              attendances.ids
              .slice() 
              .sort((a, b) => new Date(attendances.entities[b].createdAt) - new Date(attendances.entities[a].createdAt))
              .map((id, index) => {
                const attendance = attendances.entities[id];

                return (
                  <div key={index}>
                    <Card variant={"elevated"} >
                      <CardHeader>
                        <Flex>
                          <Heading fontSize={{base:'1.6rem',md:'1.8rem',lg:"2rem"}} pl={"10px"} mt={"15px"}>
                            Attendance
                          </Heading>
                        </Flex>
                      </CardHeader>
                      <CardBody fontSize={{base:'1rem',md:'1.1rem',lg:"1.3rem"}}>
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
                        <Divider  />
                      <CardFooter>
                        <Spacer />
                        <Icon as={MdVisibility} color={'grey'} mr={5} onClick={() => singleAttendance(id)}/>
                        <Icon as={MdDelete} color={'red'} />
                      </CardFooter>
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
