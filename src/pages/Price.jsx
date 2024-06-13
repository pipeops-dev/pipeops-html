import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import image from "../images/25.png";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import tag from "../images/price-tag.png";
import wallet from "../images/wallet.png";
import diamond from "../images/diamond.png";
import anchor from "../images/anchor.png";
import target from "../images/target.png";
import rocket from "../images/rocket.png";
import visa from "../images/visa.svg";
import mastercard from "../images/mastercard.svg";
import paystack from "../images/paystack.svg";
import chimoney from "../images/chimoney.png";
import googlepay from "../images/googlepay.svg";
// import Navbar from "../component/Navbar"
import Footer from "../component/Footer";

import {
  CalendarIcon,
  CheckCircleIcon,
  InfoIcon,
  NotAllowedIcon,
  PhoneIcon,
  StarIcon,
  TimeIcon,
  WarningIcon,
} from "@chakra-ui/icons";
export default function Price() {
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");

  return (
    <div>
      
      <SimpleGrid
        columns={{ base: "1", md: "1", lg: "2", xl: "2" }}
        mt={{ base: "2.4em", md:'3em', lg: "5em", xl: "5.9em" }}
      >
        <Flex
          flexDir={"column"}
          align={{ base: "center", lg: "left", xl: "left" }}
          pt={"80px"}
         
        >
          <Heading
            fontSize={{ base: "1.9rem", md:'2rem', lg:'3.1rem', xl: "3.3rem" }}
            textAlign={{ base: "center", lg: "left", xl: "left" }}
            pb={"0.4em"}
            pl={{ base: "0", lg: "2.3em", xl: "3.2em" }}
            px={'auto'}
          >
            Choose the plan that best fits your institution's needs
          </Heading>
          <Text
            pb={"2em"}
            color={"gray"}
            pl={{base:"0px", lg:'2.6em', xl:'0'}}
             textAlign={{ base: "center", lg: "left", xl: "left" }}
            fontSize={{ base: "1.1rem", lg: "1.2rem", xl: "1.5rem" }}
          >
            No contracts, no commitments, no fuzz.
          </Text>
        </Flex>
        <Box
          ml={"auto"}
          mr={"auto"}
          width={{ base: "90%", lg: "75%", xl: "75%" }}
          mt={{base:'1.4em', md:'1.8em',lg:'4.9em',xl:'2em'}}
        >
          <img src={wallet} alt="price-tag" />
        </Box>
      </SimpleGrid>
      <Tabs colorScheme="pink" mt={"4em"} p={"1.4em"} variant={"enclosed"}>
        <TabList ml={"auto"} mr={"auto"} justifyContent={"center"}>
          <Tab _selected={{ color: "white", bg: "red.500" }} mr={"30px"}>
            Month
          </Tab>
          <Tab _selected={{ color: "white", bg: "red.500" }}>Annual</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              flexDir={{ base: "column", md: "colum", lg: "row", xl: "row" }}
              gap={10}
              mx={'auto'}
            >
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card>
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={anchor} alt="basic" />
                        </Box>

                        <Heading
                          fontFamily={"mono"}
                          pb={"1em"}
                          textAlign={"center"}
                        >
                          NGN 3,000
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />0 t0 1000 students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          Atmost 1000 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card>
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={target} alt="basic" />
                        </Box>

                        <Heading
                          fontFamily={"mono"}
                          pb={"1em"}
                          textAlign={"center"}
                        >
                          NGN 5,000
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />
                          1001 t0 5000 students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          At most 6000 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card>
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={rocket} alt="basic" />
                        </Box>

                        <Heading
                          fontFamily={"mono"}
                          pb={"1em"}
                          textAlign={"center"}
                        >
                          NGN 7,000
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />
                          5001 t0 20,000 students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          At most 22000 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card>
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={diamond} alt="basic" />
                        </Box>

                        <Heading fontFamily={"mono"} pb={"1em"}   textAlign={"center"}>
                          NGN 9,000
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />
                          20,000 and Above students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          Atmost 30000 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              flexDir={{ base: "column", md: "column", lg: "row", xl: "row" }}
              gap={10}
              mx={"auto"}
            >
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card>
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={anchor} alt="basic" />
                        </Box>

                        <Heading fontFamily={"mono"} pb={"1.4em"} textAlign={'center'}>
                          NGN 30,000
                        </Heading>
                        <Link to={"institution"}></Link>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />0 t0 1000 students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          Atmost 1100 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card
                    
                  >
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={target} alt="basic" />
                        </Box>

                        <Heading fontFamily={"mono"} pb={"1.4em"} textAlign={'center'}>
                          NGN 50,000
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />
                          1001 t0 5000 students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          Atmost 6000 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card>
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={rocket} alt="basic" />
                        </Box>

                        <Heading fontFamily={"mono"} pb={"1.4em"} textAlign={'center'}>
                          NGN 70,000
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />
                          5001 t0 20,000 students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          Atmost 21000 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
              <Flex align={"center"} flexDir={"column"}>
                <Box>
                  <Card>
                    <CardHeader borderBottom={"1px solid grey"}>
                      <Flex flexDir={"column"} align={"center"}>
                        <Box w={"4em"} py={"1.4em"}>
                          <img src={diamond} alt="basic" />
                        </Box>

                        <Heading fontFamily={"mono"} pb={"1.4em"} textAlign={'center'}>
                          NGN 90,000
                        </Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <List spacing={5} pt={"10px"}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />
                          20001 and Above students
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} />
                          Atmost 30000 geolocation request daily
                        </ListItem>
                        <ListItem>
                          <ListIcon as={NotAllowedIcon} />
                          No surge pricing
                        </ListItem>
                        <ListItem>
                          <ListIcon as={PhoneIcon} />
                          Priority Support with 24/7 Availability
                        </ListItem>
                        <ListItem>
                          <ListIcon as={TimeIcon} />
                          On-Site Training and Implementation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CalendarIcon} />
                          Dedicated Account Manager
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </Box>
                <Link to={"/construction"}>
                  <Button my={"1.4em"} color={"white"} colorScheme="red">
                    Subscribe
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Footer />
      <Outlet />
    </div>
  );
}
