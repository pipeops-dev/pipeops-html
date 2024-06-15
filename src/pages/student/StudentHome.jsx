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
import { useGetAttendanceTabQuery } from "../../features/attendanceTab/studentAttendanceApiSlice";

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
  const navigate = useNavigate();
  const {
    data: attendanceTabs,
    isLoading,
    isError,
  } = useGetAttendanceTabQuery(studentId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && (!attendanceTabs || attendanceTabs.ids.length === 0)) {
      navigate(`/student/${studentId}/new`);
    }
  }, [isLoading, attendanceTabs, navigate, studentId]);

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
            {attendanceTabs &&
              attendanceTabs.ids.map((id, index) => {
                const course = attendanceTabs.entities[id];

                return (
                  <div key={index}>
                    <Card variant={"elevated"}>
                      <CardHeader>
                        <Flex>
                          <Heading fontSize={"2rem"} pl={"10px"} mt={"15px"}>
                            {course.courseCode}
                          </Heading>
                          <Spacer />
                          <Menu>
                            <MenuButton>
                              {" "}
                              <IconButton
                                variant={"ghost"}
                                size={"lg"}
                                icon={<MdMoreVert />}
                              />
                            </MenuButton>
                            <MenuList ml={"-160px"} mt={"-10px"}>
                              <MenuItem icon={<MdEdit />}>
                                Edit Attendance
                              </MenuItem>
                              <MenuItem icon={<MdCalculate />}>
                                Calculate Attendance
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </CardHeader>
                      <CardBody fontSize={"1.3rem"}>
                        {course.courseName}
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Text fontSize={"1.3rem"}>
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
