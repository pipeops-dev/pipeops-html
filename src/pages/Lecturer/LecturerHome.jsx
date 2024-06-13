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
} from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import copy from "copy-to-clipboard"
import { NavLink, Outlet } from "react-router-dom"
import { color } from "framer-motion"
import {
  MdContentCopy,
  MdMoreVert,
  MdLockOutline,
  MdEdit,
  MdCalculate,
  MdLockOpen,
} from "react-icons/md"
const data = [
  { courseCode: "TME 211", title: "INTRODUCTION TO ENGINEERING DRAWING" },
  { courseCode: "TME 231", title: "INTRODUCTION TO ENGINEERING PRINCIPLES" },
  { courseCode: "MAT 224", title: "INTRODUCTION TO ENGINEERING MATHEMATICS" },
  { courseCode: "GNS 210", title: "INTRODUCTION TO ENTREPRENEURSHIP" },
]

export default function LecturerHome() {
  useEffect(() => {
    document.body.classList.add("bg-color")
  }, [])
  const [lock, setLock] = useState(Array(data.length).fill(true))
  const handleOpen = (index) => {
    setLock((prevLock) => {
      const updatedLock = [...prevLock]
      updatedLock[index] = !lock[index]
      return updatedLock
    })
  }
  return (
    <div>
      <SimpleGrid
        columns={{ base: "1", lg: "3", xl: "3" }}
        mx={"20px"}
        gap={"10"}
        mt={"30px"}
      >
        {data.map((item, index) => {
          const { courseCode, title } = item
          const [code, setCode] = useState()
          return (
            <Card key={index}>
              <CardHeader>
                <Flex>
                  <Text fontSize={"1.6rem"} pl={"10px"} mt={"15px"}>
                    {courseCode}
                  </Text>
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
              <CardBody>{title}</CardBody>
              <CardFooter>
                <Spacer />
                <IconButton
                  onClick={() => handleOpen(index)}
                  variant={"ghost"}
                  icon={lock[index] ? <MdLockOutline /> : <MdLockOpen />}
                  size={"lg"}
                />
                <IconButton
                  onClick={() => {
                    setCode(courseCode + uuidv4())
                    copy(code)
                    alert(`You have copied ${courseCode} attendance code`)
                  }}
                  variant={"ghost"}
                  size={"lg"}
                  icon={<MdContentCopy />}
                />
              </CardFooter>
            </Card>
          )
        })}
      </SimpleGrid>
    </div>
  )
}