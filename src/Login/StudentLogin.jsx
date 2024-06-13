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
  Link,
  VStack,
  List,
  ListItem,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
  Checkbox,
} from "@chakra-ui/react";
import institutions from "nigerian-institutions";
import { FaUser } from "react-icons/fa";
import { CloseIcon, EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/studentAuth/studentAuthApiSlice";

import logo from "../images/logo-revamp.svg";

import { useEffect, useState } from "react";
import { Form, Outlet, useNavigate, useParams } from "react-router-dom";
import { color } from "framer-motion";
import { setCredentials } from "../features/studentAuth/studentAuthSlice";
import usePersist from "../hook/usePersist";
import { useToast } from "@chakra-ui/react";

export default function StudentLogin() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[A-z0-9!@#$%]{4,12}$/;
  const [login, { isLoading }] = useLoginMutation();

  const toast = useToast();
  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);
  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const studentFormData = new FormData(e.currentTarget);
    let values = [...studentFormData.values()];
    console.log(values);

    let errors = {};
    const canSave = [validEmail, validPassword].every(Boolean) && !isLoading;

    if (canSave) {
      try {
        const { id, accessToken } = await login({
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ accessToken }));

        setEmail("");
        setPassword("");
        navigate(`/student/${id}`);
        toast({
          title: "Goodie!",
          description: "You have successfully logged in",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // Handle success case
      } catch (err) {
        // Handle error case
        if (!err.status) {
          setErrMsg("No Server Response");
        } else if (err.status === 401) {
          setErrMsg("Unauthoriserd Access");
        } else if (err.status === 401) {
          setErrMsg("Invalid email or password");
        } else {
          setErrMsg(err.data?.message);
        }

        toast({
          title: "Auuchh!",
          description: errMsg,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }

    if (!values[0]) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(values[0])) {
      errors.email = "Please enter a valid email.";
    }
    if (!values[1]) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(values[1])) {
      errors.password =
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    setErrors(errors);
  };

  const handleToggle = () => setPersist((prev) => !prev);

  const buttonReturn = {
    bgColor: "#213655",
    color: "white",
    ":hover": {
      color: "black",
      bgColor: "blue.100",
    },
  };

  const signin = () => {
    navigate("/signin/student");
  };
  return (
    <div>
      <Flex
        flexDir={"column"}
        mt={{ base: "60px", md: "150px", lg: "100px", xl: "10px" }}
        py={"20px"}
        w={{ base: "90%", xl: "50%" }}
        mr={"auto"}
        ml={"auto"}
      >
        <Flex justify={"center"}>
          <Box w={"15%"}>
            <img src={logo} alt="logo" />
          </Box>
        </Flex>

        <Heading
          fontFamily={"mono"}
          color={"#213655"}
          fontSize={{ base: "1.9em", md: "1.7em", lg: "3em", xl: "3em" }}
          textAlign={"center"}
          mb={"1.4em"}
        >
          Login
        </Heading>

        <Flex flexDir="column">
          <Form
            method="post"
            // action='/signin/student'
            onSubmit={handleSubmit}
          >
            <FormControl
              mb={"2rem"}
              w={"90%"}
              ml={"auto"}
              mr={"auto"}
              isInvalid={isSubmitted && errors.email}
            >
              <InputGroup>
                <InputLeftElement pointerEvents={"none"}>
                  <EmailIcon color="gray" />
                </InputLeftElement>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  w={"100%"}
                  border={"1px solid gray"}
                  autoComplete="off"
                  outline={"none"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
              </InputGroup>
              {isSubmitted && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              mb={"2rem"}
              w={"90%"}
              ml={"auto"}
              mr={"auto"}
              isInvalid={isSubmitted && errors.password}
            >
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
                  name="password"
                  placeholder="Password"
                  w={"100%"}
                  border={"1px solid gray"}
                  outline={"none"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              {isSubmitted && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>

            {!isLoading ? (
              <Flex justify={"center"} my={"2em"}>
                <Button
                  type="submit"
                  backgroundColor={
                    email.length < 1 || password.length < 1 ? "grey" : "red"
                  }
                  color={"white"}
                  w={"auto"}
                >
                  login
                </Button>
              </Flex>
            ) : (
              <Flex justify={"center"} my={"2em"}>
                <Button
                  type="submit"
                  isLoading
                  colorScheme="teal"
                  variant="solid"
                  w={"25%"}
                ></Button>
              </Flex>
            )}

            <Checkbox isChecked={persist} onChange={handleToggle}>
              Remember me
            </Checkbox>
          </Form>

          <Flex mb={"2em"} mx={"1.5em"}>
            <Text
              pr={".4em"}
              fontSize={{ base: ".6rem", lg: ".9rem", xl: ".9rem" }}
            >
              Don't have an account?
            </Text>
            <Link
              onClick={signin}
              textAlign={"center"}
              color={"red"}
              fontSize={{ base: ".6rem", lg: ".9rem", xl: ".9rem" }}
            >
              signin
            </Link>
          </Flex>
        </Flex>
      </Flex>

      <Outlet />
    </div>
  );
}
