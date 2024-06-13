import {
  Box,
  Button,
  Flex,
  Heading,
  Container,
  SimpleGrid,
  Text,
  HStack,
  Grid,
  GridItem,
  Show,
  Hide,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { keyframes, css } from "@emotion/react";
import { useDisclosure } from "@chakra-ui/react";
import topImage from "../images/image_1.png";
import easy_attendance from "../images/easy_attendance.png";
import real_time from "../images/real_time.png";
import confirm from "../images/online.png";
import easyuse from "../images/easy-to-use.png";
import data_analysis from "../images/data_analysis.png";
import check from "../images/check.png";
import line from "../images/line2.svg";
import underline5 from "../images/underline5.svg";
import arrow4 from "../images/arrow4.svg";
import punct from "../images/punctuation1.svg";
import doodle from "../images/doodle2.svg";
import arrow5 from "../images/arrow5.svg";
import cornerarrow from "../images/cornerarrow.svg";
import cookies from "../images/cookies.png";
import grading from "../images/grading.png";
import doodle4 from "../images/doodle4.svg";
import Body from "../component/Body";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "@fontsource/lato/400.css";
import "@fontsource/prompt/900.css";
import "@fontsource/raleway/500.css";
import "@fontsource/roboto/300.css";
// import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export const Home = () => {
  const fonts = [
    "prompt",
    "Arial",
    "Verdana",
    "Courier",
    "cursive",
    "monospace",
    "roboto",
  ];
  const bodyContent = [
    {
      image: easy_attendance,
      title: "Effortless Attendance Submission",
      text: "Never worry about attendance again. Lecturers can easily manage and students can quickly submit attendance with a few click. ",
    },
    {
      image: real_time,
      title: "Real-Time Verification",
      text: "Say farewell to inaccurate and unreliable means of taking attendance. Our cutting-edge geolocation technology and proximity verification ensure only students physically present in your class can submit attendance.",
    },
    {
      image: easyuse,
      title: "User-Friendly Interface",
      text: "A simple and intuitive interface that requires minimal training for lecturers and students alike.",
    },
    {
      image: data_analysis,
      title: "Insights and Reporting",
      text: "Gain valuable insights into attendance trends and patterns and make data-driven decisions to enhance student engagement and classroom dynamics.",
    },
    // {
    //   image: grading,
    //   title: "Automatic Grading",
    //   text: "Never worry about attendance again. Lecturers can easily manage and students can quickly submit attendance with a few click. ",
    // },
  ];

  const [fontIndex, setFontIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const firstRegister = {
    bgColor: "#213655",
    color: "white",
    ":hover": {
      bgColor: "#f2575d",
      borderRadius: "10px",
    },
    borderRadius: "0",
  };

  const secondRegister = {
    color: "#213655",
    border: "3px solid #213655 ",
    bgColor: "transparent",
    borderRadius: "0",
    ":hover": {
      bgColor: "#f2575d",
      color: "white",
      border: "3px solid #f2575d ",
      borderRadius: "10px",
    },
  };
  const cookie = {
    color: "#213655",
    border: "1px solid grey ",
    bgColor: "transparent",
    borderRadius: "10px",
    ":hover": {
      bgColor: "#f2575d",
      color: "white",
      border: "0px solid #f2575d ",
    },
  };
  const fadeIn = {
    initial: {
      opacity: 0,
      y: "300",
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  const fadeInto = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };
  const SlideIn = {
    initial: {
      opacity: 0,
      x: 200,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  const MotionBox = motion(Box);
  const CookieHeader = React.memo(({ children }) => (
    <Flex justify={"center"} align={"center"}>
      <Heading textAlign={"center"} pr={"15px"}>
        {children}
      </Heading>
      <Box w={"1.875rem"}>
        <img src={cookies} alt="cookie" />
      </Box>
    </Flex>
  ));
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen();
    }, 5000);
    const cleanup = () => {
      clearTimeout(timer);
      onClose();
    };
  }, [onOpen, onClose]);

  const [isCookiePolicyAccepted, setIsCookiePolicyAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiePolicyAccepted");
    setIsCookiePolicyAccepted(accepted === "true");
  }, []);

  const handleAccept = () => {
    setIsCookiePolicyAccepted(true);
    localStorage.setItem("cookiePolicyAccepted", "true");
  };

  return (
    <div>
      {!isCookiePolicyAccepted && (
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent overflowX="hidden">
            <DrawerCloseButton />
            <DrawerHeader>
              <CookieHeader>This website uses cookies</CookieHeader>
            </DrawerHeader>
            <DrawerBody>
              <Container>
                <Text>
                  This website uses cookies and other tracking technologies
                  improve your experience on our website. By using our website,
                  you consent to all cookies in accordance with our Cookie
                  Policy
                </Text>
              </Container>
            </DrawerBody>
            <Flex flexDirection={"row"} justify={"center"}>
              <DrawerFooter>
                <Button sx={cookie} mr={3} onClick={onClose}>
                  <Link to={"/construction"}>Read more</Link>
                </Button>
                <Button sx={cookie} mr={3} onClick={handleAccept}>
                  Accept
                </Button>
              </DrawerFooter>
            </Flex>
          </DrawerContent>
        </Drawer>
      )}
      <Flex
        as="section"
        flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
        align={"center"}
        justify={{ base: "center", md: "center", lg: "space-between" }}
        gap={{ base: 0, lg: 5 }}
        my={"2.5rem"}
      >
        <Container
          position={"relative"}
          as={motion.div}
          variants={fadeIn}
          initial={"initial"}
          whileInView={"animate"}
          transition={{
            delay: 0.5,
            ease: "ease-in",
            type: "spring",
            stiffness: 120,
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
          my={{ base: "3.5rem", md: "5rem", lg: "8.75rem", xl: "11rem" }}
          px={{ base: "1.25rem", lg: "1.875rem", xl: "1.875rem" }}
        >
          <Heading
            color={"#213655"}
            textAlign={{ base: "center", lg: "left", xl: "left" }}
            pb={"15px"}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "5xl" }}
          >
            Get the best way to obtain and monitor students' attendance
          </Heading>
          <Show above="lg">
            <Box
              as={motion.div}
              variants={fadeIn}
              initial={"initial"}
              whileInView={"animate"}
              transition={{
                delay: 1,
                ease: "ease-in",
                type: "tween",
                duration: 1,
              }}
              viewport={{
                once: true,
              }}
              w={"5rem"}
              pos={"absolute"}
              top={"-20%"}
              right={0}
            >
              <img
                src={doodle4}
                alt="doodle"
                style={{
                  filter:
                    "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
                }}
              />
            </Box>
          </Show>
          <Text
            pb={"1.25rem"}
            textAlign={{ base: "center", lg: "left", xl: "left" }}
          >
            {" "}
            Say goodbye to traditional paper filling and hello to a smart,
            efficient and accurate solution that transforms your classroom
            experience. Empower Educators, Engage Students.
          </Text>
          <Flex
            gap={5}
            flexDir={{ base: "column", md: "column", lg: "row", xl: "row" }}
          >
            <Button sx={firstRegister}>
              <NavLink to={"register-institution"}>
                Register your Institution
              </NavLink>
            </Button>
            <Button sx={secondRegister}>
              <NavLink to={"signin"}>Signup as Tutor/Student</NavLink>
            </Button>
          </Flex>
        </Container>
        <Container
          as={motion.div}
          variants={SlideIn}
          initial={"initial"}
          whileInView={"animate"}
          transition={{ delay: 0.8, ease: "ease-in", duration: 1 }}
          viewport={{
            once: true,
          }}
          w={"auto"}
        >
          <img
            src={topImage}
            alt="imageOne"
            style={{
              height: "auto",
              width: "100%",
            }}
          />
        </Container>
      </Flex>

      <Box>
        <img src={line} alt="line" width={"100%"} />
      </Box>

      <Box as="section" backgroundColor={"#fff"} width={"100%"}>
        <Container as="section" backgroundColor={"#fff"} pt={"100px"}>
          <Heading
            as={motion.div}
            variants={fadeIn}
            initial={"initial"}
            whileInView={"animate"}
            transition={{ delay: 0.8, ease: "ease-in" }}
            viewport={{
              once: true,
            }}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
            pos={"relative"}
            // textAlign={{ base: "center", md: "left", xl: "left" }}
            textAlign={"center"}
          >
            Transforming Education, One{" "}
            <Box as="span" position="relative" fontFamily={fonts[fontIndex]}>
              Attendance
              <Box
                as={motion.div}
                variants={fadeIn}
                initial={"initial"}
                whileInView={"animate"}
                transition={{ delay: 0.9, ease: "ease-in" }}
                viewport={{
                  once: true,
                }}
                pos={"absolute"}
                left={0}
                bottom={0}
              >
                <img
                  src={underline5}
                  alt="loop"
                  style={{
                    filter:
                      "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
                  }}
                />
              </Box>
            </Box>{" "}
            at a Time.
          </Heading>

          <Text
            as={motion.div}
            variants={fadeIn}
            initial={"initial"}
            whileInView={"animate"}
            transition={{ delay: 0.8, ease: "ease-in" }}
            viewport={{
              once: true,
            }}
            pt={"40px"}
            pb={"20px"}
            textAlign={"center"}
          >
            Discover a new era of attendance tracking that combines technology,
            accuracy, and ease-of-use to transform the way educational
            institutions manage students' attendance.
          </Text>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            as={motion.div}
            variants={fadeIn}
            initial={"initial"}
            whileInView={"animate"}
            transition={{ delay: 0.9, ease: "ease-in" }}
            viewport={{
              once: true,
            }}
            w={"3.125rem"}
            ml={"auto"}
            mr={"auto"}
          >
            <img
              w={"100%"}
              src={arrow4}
              alt="loop"
              style={{
                filter:
                  "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
              }}
            />
          </Flex>
        </Container>
        <HStack as="flex" justifyContent={"center"}>
          <Heading
            textAlign={"center"}
            // pb={"auto"}
            py={"3.125rem"}
            color={"#213655"}
            fontFamily={"mono"}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
          >
            Why use S.A.M.S
          </Heading>
          <Box w={"14px"}>
            <img
              src={punct}
              style={{
                filter:
                  "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
              }}
              alt="loop"
            />
          </Box>
        </HStack>
        <Body bodyContent={bodyContent} />

        <Flex
          justify={"center"}
          pb={{ base: "0", md: "1.875rem", lg: "2.5rem", xl: "2.5rem" }}
        >
          <NavLink to={"/construction"}>
            <Button
              as={motion.div}
              variants={fadeInto}
              initial={"initial"}
              whileInView={"animate"}
              transition={{ delay: 1, ease: "ease-in" }}
              viewport={{
                once: true,
              }}
              sx={firstRegister}
              pos={"relative"}
              px={{
                base: "2.5rem",
                md: "2.5rem",
                lg: "3.75rem",
                xl: "3.75rem",
              }}
              my={"1.875rem"}
            >
              <Show above="lg">
                <Box
                  as={motion.div}
                  variants={fadeInto}
                  initial={"initial"}
                  whileInView={"animate"}
                  transition={{ delay: 1, ease: "ease-in" }}
                  viewport={{
                    once: true,
                  }}
                  w={"1.875rem"}
                  pos={"absolute"}
                  // left={{ base: "20%", md: "30%", lg: "35%", xl: "38%" }}
                  left={"-20%"}
                  bottom={"50%"}
                >
                  <img
                    src={doodle}
                    alt="doodle"
                    style={{
                      filter:
                        "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
                    }}
                  />
                </Box>
              </Show>
              LEARN MORE
              <Show below="lg">
                <MotionBox
                  w={"1.875rem"}
                  ml={"1.25rem"}
                  animate={{
                    x: ["0px", "10px", "0px", "10px", "0px"],
                    transition: {
                      repeat: Infinity,
                      duration: 0.5,
                      repeatDelay: 3,
                    },
                  }}
                >
                  <img
                    src={arrow5}
                    style={{
                      filter:
                        "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
                    }}
                    alt="arrow"
                  />
                </MotionBox>
              </Show>
            </Button>
          </NavLink>
        </Flex>
      </Box>

      <Flex
        as="section"
        flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
        align={"center"}
        justify={{ base: "center", md: "center", lg: "space-between" }}
        py={"3rem"}
        gap={10}
      >
        <Container
          as={motion.div}
          variants={fadeIn}
          initial={"initial"}
          whileInView={"animate"}
          transition={{ delay: 1, ease: "ease-in" }}
          viewport={{
            once: true,
          }}
          // mt={"0px"}
          // ml={{ base: "auto", md: "auto", lg: "50px", xl: "200px" }}
          // mr={{ base: "auto" }}
        >
          <Text
            as={"h1"}
            // mb={"35px"}
            fontSize={"2xl"}
            // ml={"30px"}
            textAlign={{ base: "center", md: "center", lg: "left", xl: "left" }}
            fontFamily={"mono"}
            // mt={{ base: "0px", lg: "40px", xl: "60px" }}
          >
            Experience the future of attendance tracking. Join hundreds of
            institutions who are already making attendance management more
            accurate, efficient and engaging.
          </Text>
          <HStack
            as={"flex"}
            align={"center"}
            justify={{ base: "center", lg: "left", xl: "left" }}
            ml={{ base: "0", lg: "4.5em", xl: "4.5em" }}
            mt={"2rem"}
          >
            <Link to={"/construction"}>
              <Text color={"#f2575d"} position={"relative"} fontWeight={800}>
                {" "}
                <Box
                  w={"3.125rem"}
                  position={"absolute"}
                  left={"-60%"}
                  bottom={"-23%"}
                >
                  <img src={cornerarrow} alt="corner-arrow" />
                </Box>{" "}
                Request Demo
              </Text>
            </Link>
          </HStack>
        </Container>
        <Container
          as={motion.div}
          variants={SlideIn}
          initial={"initial"}
          whileInView={"animate"}
          transition={{ delay: 1, ease: "ease-in" }}
          viewport={{
            once: true,
          }}
          // w={{ base: "370px", md: "450px", lg: "450px", xl: "450px" }}
          // mr={"auto"}
          // ml={"auto"}
          maxW={"500px"}
        >
          <img src={check} alt="join" />
        </Container>
      </Flex>
      <Footer />

      {/* <Outlet /> */}
    </div>
  );
};
