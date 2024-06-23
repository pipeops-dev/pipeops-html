import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import image from "../images/404-page.png";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { color } from "framer-motion";
export default function NotFound() {
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const buttonReturn = {
    bgColor: "#213655",
    color: "white",
    ":hover": {
      color: "black",
      bgColor: "blue.100",
    },
  };
  return (
    <div>
      <Container py={"60px"}>
        <Heading>Page not found!</Heading>
        <HStack py={"20px"}>
          <Text px={"10px"} fontWeight={"semibold"}>
            Awww Sorry!
          </Text>
          <Button sx={buttonReturn}>
            <NavLink to="/">Return home</NavLink>
          </Button>
        </HStack>
      </Container>
      <Box
        width={{ md: "700px", lg: "900px" }}
        ml={{ md: "70px", lg: "500px" }}
        my={{ base: "0px", lg: "-70px" }}>
        <img src={image} alt="image" />
      </Box>

      <Outlet />
    </div>
  );
}
