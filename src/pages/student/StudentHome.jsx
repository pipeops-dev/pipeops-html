import {
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  Flex,
  SimpleGrid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Icon,
  Heading,
  Divider,
  HStack,
  Spinner,
  Center,
  
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { color } from "framer-motion";
import { useGetAttendanceTabQuery } from "../../features/attendanceTab/studentAttendanceTabApiSlice";
import { useVerifyPinMutation } from "../../features/student/studentsApiSlice";
import { useUpdateAttendanceMutation } from "../../features/attendance/studentAttendanceApiSlice";
import {
  MdMoreVert,
  MdLockOutline,
  MdEdit,
  MdCalculate,
  MdLockOpen,
} from "react-icons/md";

export default function StudentHome() {
  const { id } = useParams();
  const [studentId, setStudentId] = useState(id);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const {
    data: attendanceTabs,
    isLoading,
    isError,
  } = useGetAttendanceTabQuery(studentId, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(attendanceTabs)

  useEffect(() => {
    if (!isLoading && (!attendanceTabs || attendanceTabs.ids.length === 0)) {
      navigate(`/student/${studentId}/new`);
    }
  }, [isLoading, attendanceTabs, navigate, studentId]);

  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const handleSubmit = (course) => {
    console.log(course.attendanceId)

    navigate(`/student/${id}/attendance/${course.attendanceId}`)
    
};


 
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
            {attendanceTabs &&
              attendanceTabs.ids.map((id, index) => {
                const course = attendanceTabs.entities[id];

                return (
                  <div key={index}>
                    <Card
                      variant={"elevated"}
                      backgroundColor={course.Open ? "white" : "#D3D3D3"}
                      onClick={course.Open ? () => handleSubmit(course) : undefined}
                      //h={'full'}
                      mb={5}
                    >
                      <CardHeader>
                        <Flex>
                          <Heading fontSize={"2rem"} pl={"10px"} mt={"15px"}>
                            {course.courseCode}
                          </Heading>
                          <Spacer />
                        </Flex>
                      </CardHeader>
                      <CardBody fontSize={"1.3rem"}>
                        {course.courseName}
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Text fontSize={{base:"1rem", md:'1.3rem', lg:'1.4rem'}}>
                          LECTURER-IN-CHARGE: {course.lecturerName}
                        </Text>
                        <Spacer />
                        <HStack>
                          <IconButton
                            variant={"ghost"}
                            icon={
                              course.Open ? (
                                <MdLockOpen color="green" />
                              ) : (
                                <MdLockOutline color="red" />
                              )
                            }
                            size={"lg"}
                          />
                        </HStack>
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
