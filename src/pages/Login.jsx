import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import arrow from "../images/arrow6.svg";
import punct from "../images/punct.svg";
import { useEffect, useState } from "react";
import { Form, NavLink, Outlet } from "react-router-dom";
import { color } from "framer-motion";
export default function Login() {
  useEffect(() => {
    document.body.classList.add("bg-color");
  }, []);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

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
      <Flex
        flexDir={"column"}
        mt={{ base: "150px", md: "150px", lg: "180px", xl: "200px" }}
        bgColor={"white"}
        py={"20px"}
        w={{ base: "90%", xl: "50%" }}
        mr={"auto"}
        ml={"auto"}>
        <Flex
          flexDirection={"row"}
          justify={"center"}
          align={"center"}
          mb={"20px"}>
          <Box w={"30px"} mt={"20px"} mr={"10px"}>
            <img
              src={punct}
              style={{
                filter:
                  "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
              }}
            />
          </Box>

          <Heading fontFamily={"mono"} mt={"30px"} color={"#213655"}>
            Login
          </Heading>
        </Flex>

        <Container mt={"40px"} mr={"auto"} ml={"auto"}>
          <Form>
            <FormControl mb={"30px"}>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"}>
                  <EmailIcon color="gray" />
                </InputLeftElement>
                <Input
                  type="email"
                  value={email}
                  placeholder="Email"
                  w={"100%"}
                  border={"1px solid gray"}
                  outline={"none"}
                  onChange={handleEmailChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl mb={"30px"}>
              <InputGroup>
                <InputLeftElement>
                  <Box onClick={handleShow} variant={"ghost"}>
                    {show ? (
                      <ViewIcon color={"gray"} />
                    ) : (
                      <ViewOffIcon color={"gray"} />
                    )}
                  </Box>
                </InputLeftElement>
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  w={"100%"}
                  border={"1px solid gray"}
                  onChange={handlePasswordChange}
                />
              </InputGroup>
            </FormControl>
            <Flex justify={"center"} mb={"30px"}>
              <Button type="submit" colorScheme="red" w={"30%"}>
                Jump In
              </Button>
            </Flex>
          </Form>

          <Box
            pos={"absolute"}
            w={{ base: "100px", md: "130px", lg: "150px", xl: "150px" }}
            bottom={"10%"}>
            <img
              src={arrow}
              style={{
                filter:
                  "invert(34%) sepia(71%) saturate(3040%) hue-rotate(328deg) brightness(101%) contrast(89%)",
              }}
            />
          </Box>
        </Container>
      </Flex>

      <Outlet />
    </div>
  );
}
