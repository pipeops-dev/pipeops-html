import {

  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  MdClass,
  MdFace,
  MdOutlineTrendingDown,
  MdOutlineTrendingFlat,
  MdOutlineTrendingUp,
  MdPeopleAlt,
} from "react-icons/md";
import { useState } from "react";
import BarChart from "../../component/BarChart";
import LineChart from "../../component/LineChart";
import { attendanceData } from "../data";
import Saving from "../../images/Savings.png";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function InstitutionHome() {
  const [userData, setUserData] = useState({
    labels: attendanceData.map((data) => data.course),
    datasets: [
      {
        label: "Attendance Rate %",
        data: attendanceData.map((data) => data.rate),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50af95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  const [lineData, setLineData] = useState({
    labels: attendanceData.map((data) => data.time),
    datasets: [
      {
        label: "Attendance Rate %",
        data: attendanceData.map((data) => data.rate),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  return (
    <div>
      <SimpleGrid
        columns={{ base: "1", lg: "3", xl: "3" }}
        mt={"40px"}
        ml={"20px"}
        gap={10}
        mr={"40px"}>
        <Card pl={"20px"} ml={"20px"}>
          <CardHeader>
            <Icon as={MdPeopleAlt} boxSize={10} mb={"-40px"} />
          </CardHeader>
          <CardBody mb={"-30px"}>
            <Text fontSize={"2.5em"} pb={"10px"}>
              173
            </Text>
            Number of Lecturers
          </CardBody>
          <CardFooter>
            <Flex align={"center"}>
              <Icon as={MdOutlineTrendingFlat} color={"orange"} mr={"10px"} />
              <Text>0.08%</Text>
            </Flex>
          </CardFooter>
        </Card>
        <Card pl={"20px"}>
          <CardHeader>
            <Icon as={MdFace} boxSize={10} mb={"-40px"} />
          </CardHeader>
          <CardBody mb={"-30px"}>
            <Text fontSize={"2.5em"} pb={"10px"}>
              3,273
            </Text>
            Number of Students
          </CardBody>
          <CardFooter>
            <Flex align={"center"}>
              <Icon as={MdOutlineTrendingDown} color={"red"} mr={"10px"} />
              <Text>10.08%</Text>
            </Flex>
          </CardFooter>
        </Card>
        <Card pl={"20px"}>
          <CardHeader>
            <Icon as={MdClass} boxSize={10} mb={"-40px"} />
          </CardHeader>
          <CardBody mb={"-30px"}>
            <Text fontSize={"2.5em"} pb={"10px"}>
              689
            </Text>
            Number of courses
          </CardBody>
          <CardFooter>
            <Flex align={"center"}>
              <Icon as={MdOutlineTrendingUp} color={"green"} mr={"10px"} />
              <Text>20.28%</Text>
            </Flex>
          </CardFooter>
        </Card>
      </SimpleGrid>
      <Flex
        gap={5}
        mt={"30px"}
        mr={"auto"}
        ml={{ base: "auto", lg: "20px", xl: "20px" }}
        align={{ base: "center", lg: "normal", xl: "normal" }}
        flexDirection={{ base: "column", lg: "row", xl: "row" }}>
        <Box
          width={{ base: "90%", md: "100%", lg: "50%", xl: "50%" }}
          border={"1px solid lightpink"}
          borderRadius={"15px"}
          backgroundColor={"lightpink"}
          p={"10px"}>
          <Flex>
            <Text fontWeight={"bold"} p={"10px"}>
              Attendance Rate Analysis
            </Text>
            <Spacer />
            <Menu>
              <MenuButton
                as={Button}
                bgColor={"lightpink"}
                rightIcon={<ChevronDownIcon />}>
                Current Month
              </MenuButton>
              <MenuList bgColor={"lightpink"}>
                <MenuItem bgColor={"lightpink"}>Yesterday</MenuItem>
                <MenuItem bgColor={"lightpink"}>Last week</MenuItem>
                <MenuItem bgColor={"lightpink"}>Last Month</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <LineChart chartData={lineData} />
        </Box>
        <Box
          width={{ base: "90%", md: "100%", lg: "40%", xl: "40%" }}
          border={"2px solid black"}
          borderRadius={"15px"}
          p={"20px"}>
          <BarChart chartData={userData} />
          <Flex>
            <Text fontWeight={"bold"} pt={"10px"}>
              Course Attendance Overview
            </Text>
            <Spacer />
            <Menu>
              <MenuButton
                as={Button}
                bgColor={"transparent"}
                rightIcon={<ChevronDownIcon />}>
                Current Month
              </MenuButton>
              <MenuList>
                <MenuItem>Yesterday</MenuItem>
                <MenuItem>Last week</MenuItem>
                <MenuItem>Last Month</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
        <Flex flexDirection={"column"}>
          <Flex
            flexDirection={"column"}
            align={"center"}
            w={"260px"}
            border={"2px solid #ffefd3"}
            borderRadius={"15px"}
            backgroundColor={"#ffefd3"}
            h={"230px"}>
            <Box
              width={{ base: "50%", md: "75%", lg: "50%", xl: "50%" }}
              mt={"-20px"}>
              <img src={Saving} alt="saving" />
            </Box>
            <Text pr={"10px"} pl={"20px"} pt={"20px"}>
              You have 10 days left on your subscription
            </Text>
          </Flex>
        </Flex>

      </Flex>
    </div>
  );
}

