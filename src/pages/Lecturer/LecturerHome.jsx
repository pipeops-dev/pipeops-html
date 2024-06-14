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
  Center,
  Spinner,
  Heading,
  Divider,
  HStack
} from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import { useClipboard } from '@chakra-ui/react';
import {useParams, useNavigate } from "react-router-dom"
import { color } from "framer-motion"
import { useGetAttendanceTabQuery } from "../../features/attendanceTab/lecturerAttendanceTabApiSlice"
import { useToggleOpenAttendanceTabMutation } from "../../features/attendanceTab/lecturerAttendanceTabApiSlice"
import {
  MdContentCopy,
  MdMoreVert,
  MdLockOutline,
  MdEdit,
  MdCalculate,
  MdLockOpen,
} from "react-icons/md"


export default function LecturerHome() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [lecturerId, setLecturerId] = useState(id)
  const { onCopy } = useClipboard();
  const {
    data: attendanceTabs,
    isLoading,
    isError,
  } = useGetAttendanceTabQuery(lecturerId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [toggleOpenAttendanceTab, {isSuccess}] = useToggleOpenAttendanceTabMutation()
  useEffect(() => {
    if (!isLoading && (!attendanceTabs || attendanceTabs.ids.length === 0)) {
      navigate(`/lecturer/${lecturerId}/new`);
    }
  }, [isLoading, attendanceTabs, navigate, lecturerId]);
  useEffect(() => {
    document.body.classList.add("bg-color")
  }, [])
  
  const handleCardClick = async (id) => {
    console.log(id)
    try {
     await toggleOpenAttendanceTab({id})
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    
    <div>
        {
          isLoading ? (
            <Center height='100vh'>
              <Spinner size='xl' />
            </Center>
          ) :(
            <div>
        <SimpleGrid
          columns={{ base: "1", lg: "3", xl: "3" }}
          mx={"20px"}
          gap={"10"}
          mt={"30px"}
        >
          {attendanceTabs && attendanceTabs.ids.map((id, index) => {
            const course = attendanceTabs.entities[id];
  
            return (
              <div key={index}>
                <Card variant={'elevated'}>
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
                          <MenuItem icon={<MdEdit />}>Edit Attendance</MenuItem>
                          <MenuItem icon={<MdCalculate />}>
                            Calculate Attendance
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </CardHeader>
                  <CardBody fontSize={"1.3rem"}>{course.courseName}</CardBody>
                  <Divider />
                  <CardFooter>
                    <Spacer />
                    <HStack>
                    
                    <IconButton
                      onClick={() => handleCardClick(id)}
                      variant={"ghost"}
                      icon={course.Open ? <MdLockOpen color="green" /> : <MdLockOutline color='red' /> }
                      size={"lg"}
                    />

                    <IconButton
                  onClick={() => {
                    onCopy(course.attendanceCode)
                    alert(`You have copied ${course.attendanceCode} attendance code`)
                  }}
                  variant={"ghost"}
                  size={"lg"}
                  icon={<MdContentCopy />}
                />
                    </HStack>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </SimpleGrid>
      </div>
          )
        }
      </div>
    );
}

