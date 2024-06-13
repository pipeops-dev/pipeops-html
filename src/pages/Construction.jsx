import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import image from "../images/25.png";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { color } from "framer-motion";
export default function Construction() {
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
      <Container mt={"3em"}>
        <Heading>Page in development</Heading>
        <HStack pt={"1.4em"}>
          <Text px={"10px"} fontWeight={"semibold"} color={'red'}>
            Check back
          </Text>
          <Button sx={buttonReturn}>
            <NavLink to="/">Return home</NavLink>
          </Button>
        </HStack>
      </Container>
      <Flex justify={"center"}>
        <Box width={{ md: "100%", lg: "50%", xl:'50%' }}>
          <img src={image} alt="image" />
        </Box>
      </Flex>
    </div>
  );
}
