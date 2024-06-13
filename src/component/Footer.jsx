import secondLogo from "../images/logo-revamp.svg"
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import facebook from "../images/facebook.svg"
import X from "../images/X.svg"
import linkedIn from "../images/linkedIn.svg"
import { Link, NavLink } from "react-router-dom"
import ResponsiveList from "../component/ResponsiveList"
export default function Footer() {
  const links = [
    [
      "Products",
      [
        { name: "Overview", path: "/" },
        { name: "Features", path: "/" },
        { name: "Pricing", path: "/price" },
        { name: "Tutorial", path: "/" },
      ],
    ],
    [
      "Company",
      [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "FAQ", path: "/" },
        { name: "Partnerships", path: "/" },
      ],
    ],
    [
      "Legal",
      [
        { name: "Terms", path: "/" },
        { name: "Privacy", path: "/" },
        { name: "Support", path: "/" },
        { name: "License", path: "/" },
      ],
    ],
  ]
  return (
    <div>
      <Grid
        overflowX='hidden'
        templateRows={{
          base: "1fr minmax(0.5fr, 20rem) 0.5fr",
          lg: "repeat(3, 1fr)",
        }}
        templateColumns={"repeat(5, 1fr)"}
        bgColor={"#213655"}
        // p={"5rem"}
        gap={10}
        p={{ base: "1rem", sm: "2rem", md: "3rem", lg: "5rem", xl: "5rem" }}
        height={{ base: "auto", lg: "auto" }}
      >
        <GridItem
          rowSpan={{ base: "1", lg: "2" }}
          colSpan={{ base: "5", lg: "2" }}
          mt={{ base: "1rem", lg: "0rem" }}
        >
          <Box textAlign={"center"}>
            <Flex justifyContent={"center"} mb={".5rem"}>
              <NavLink to={"/"}>
                <img
                  src={secondLogo}
                  alt='logo'
                  onClick={() => window.scrollTo(0, 0)}
                  width={"100px"}
                />
              </NavLink>
            </Flex>
            <Text mb={"1rem"} color={"gray.400"} fontSize={{ base: "1.4rem" }}>
              Students Attendance Management System
            </Text>
            <Text color={"white"}>
              Use S.A.M.S to get accurate, reliable, efficient, quick <br /> and
              make taking and tracking attendance <br /> easy for both lecturers
              and students.
            </Text>
          </Box>
        </GridItem>
        <GridItem
          rowSpan={{ base: "1", lg: "2" }}
          colSpan={{ base: "5", lg: "3" }}
          width={{ base: "100%" }}
          ml={{ base: "auto" }}
          mr={{ base: "auto" }}
        >
          <Flex
            gap={{ md: 10, lg: 20 }}
            width={"100%"}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={{ md: "center" }}
          >
            {links.map(([title, links], index) => (
              <ResponsiveList title={title} links={links} key={index} />
            ))}
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={{ base: "1", lg: "1" }}
          colSpan={{ base: "5", lg: "5" }}
          alignItems={{ base: "center", lg: "flex-start" }}
          justifyContent={{ base: "center", lg: "flex-start" }}
        >
          <Box>
            <Flex flexDir={"column"} align={"center"}>
              <Text color={"white"} pb={".5rem"}>
                STAY CONNECTED
              </Text>
              <Flex gap={3}>
                <Box
                  _hover={{
                    filter:
                      "invert(43%) sepia(94%) saturate(5894%) hue-rotate(204deg) brightness(102%) contrast(101%)",
                  }}
                >
                  <Link to={"#"}>
                    <img
                      src={facebook}
                      alt='fb icon'
                      width={"40px"}
                      style={{
                        filter:
                          "invert(99%) sepia(7%) saturate(140%) hue-rotate(223deg) brightness(114%) contrast(100%)",
                        transition: "filter 0.3s ease",
                      }}
                    />
                  </Link>
                </Box>
                <Box
                  _hover={{
                    filter: "invert(43%) sepia(94%) saturate(5894%) hue-rotate(204deg) brightness(102%) contrast(101%)",
                  }}
                >
                  <Link to={"#"}>
                    <img
                      src={X}
                      alt='X icon'
                      width={"40px"}
                      style={{
                        filter:
                          "invert(99%) sepia(7%) saturate(140%) hue-rotate(223deg) brightness(114%) contrast(100%)",
                        transition: "filter 0.3s ease",
                      }}
                    />
                  </Link>
                </Box>
                <Box
                  _hover={{
                    filter:
                      "invert(43%) sepia(94%) saturate(5894%) hue-rotate(204deg) brightness(102%) contrast(101%)",
                  }}
                >
                  <Link to={"#"}>
                    <img
                      src={linkedIn}
                      alt='linkedin icon'
                      width={"40px"}
                      style={{
                        filter:
                          "invert(99%) sepia(7%) saturate(140%) hue-rotate(223deg) brightness(114%) contrast(100%)",
                        transition: "filter 0.3s ease",
                      }}
                    />
                  </Link>
                </Box>
              </Flex>
              <Text color={"gray.400"} textAlign={"center"} mb={{ base: "0" }}>
                Copyright &copy; {new Date().getFullYear()}. All rights reserved
              </Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </div>
  )
}
