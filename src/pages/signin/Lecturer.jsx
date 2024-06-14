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
} from "@chakra-ui/react";
import institutions from "nigerian-institutions";
import { FaUser } from "react-icons/fa";
import { CloseIcon, EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../features/lecturerAuth/lecturerAuthApiSlice";

import logo from "../../images/logo-revamp.svg";

import { useEffect, useState } from "react";

import { Form, Outlet, useNavigate, useParams } from "react-router-dom";
import { color } from "framer-motion";
import { setCredentials } from "../../features/lecturerAuth/lecturerAuthSlice";
import { setLecturerId } from "../../features/lecturerAuth/lecturerIdSlice";
import { useToast } from "@chakra-ui/react";

export default function Lecturer() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const [firstname, setFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [institution, setInstitution] = useState("");
  const [validInstitution, setValidInstitution] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const institutionRegex = /^[A-Za-z\s,/&-]+$/;
  const formNameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[A-z0-9!@#$%]{4,12}$/;

  const toast = useToast();
  const [signup, { isLoading }] = useSignupMutation();
  useEffect(() => {
    setValidFirstname(formNameRegex.test(firstname));
  }, [firstname]);
  useEffect(() => {
    setValidLastname(formNameRegex.test(lastname));
  }, [lastname]);
  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);
  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
  }, [password]);
  useEffect(() => {
    setValidInstitution(institutionRegex.test(institution));
  }, [institution]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const lecturerFormData = new FormData(e.currentTarget);
    let values = [...lecturerFormData.values()];
    console.log(values);

    let errors = {};
    const randomImageNumber = Math.floor(Math.random() * 4) + 1; // generates a random number between 1 and 4
    const randomImageName = `user${randomImageNumber}.png`;
    
    const canSave =
      [
        validFirstname,
        validEmail,
        validLastname,
        validInstitution,
        validPassword,
      ].every(Boolean) && !isLoading;

      if (canSave) {
        try {
          const signupData = {
            firstname,
            lastname,
            email,
            password,
            institution,
            pic: randomImageName,
          };
          
      
          const { id, accessToken } = await signup(signupData).unwrap();
        dispatch(setCredentials({ accessToken }));
        dispatch(setLecturerId({ id }));
        // Handle success case
      
        setFirstname(""),
          setEmail(""),
          setLastname(""),
          setPassword(""),
          setInstitution("");
          navigate(`/code/${id}`);
          //navigate(localStorage.getItem('attendanceExist') === 'true' ? `/code/${id}/home` : `/code/${id}`);

        toast({
          position: "top",
          title: "Goodie!",
          description: "Account created successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        // Handle error case
        if (!err.status) {
          setErrMsg("No Server Response");
        } else if (err.status === 400) {
          setErrMsg("Lecturer already exists");
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
      errors.firstname = "First name is required.";
    } else if (!formNameRegex.test(values[0])) {
      errors.firstname = "Please enter only alphabets.";
    }
    if (!values[1]) {
      errors.lastname = "Last name is required.";
    } else if (!formNameRegex.test(values[1])) {
      errors.lastname = "Please enter only alphabets.";
    }
    if (!values[2]) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(values[2])) {
      errors.email = "Please enter a valid email.";
    }
    if (!values[3]) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(values[3])) {
      errors.password =
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (!values[4]) {
      errors.institution = "Institution is required.";
    } else if (!institutionRegex.test(values[4])) {
      errors.institution = "Please enter only alphabets.";
    }

    setErrors(errors);
  };

  const response = institutions.allSchools().map((school) => {
    return {
      name: school.name,
    };
  });
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInstitution(value);
    const filterSuggestions = response.filter((res) =>
      res.name.toString().toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filterSuggestions);
    setIsDropDownOpen(!!value);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropDownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const buttonReturn = {
    bgColor: "#213655",
    color: "white",
    ":hover": {
      color: "black",
      bgColor: "blue.100",
    },
  };
  const login = () => {
    navigate("/lecturer/login");
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
          Sign up as a lecturer
        </Heading>

        <Flex flexDir="column">
          <Form
            method="post"
            // action='/signin/lecturer'
            onSubmit={handleSubmit}
          >
            <Flex gap={4} w={"90%"} mr={"auto"} ml={"auto"}>
              <FormControl
                mb={"2rem"}
                ml={"auto"}
                mr={"auto"}
                isInvalid={isSubmitted && errors.firstname}
              >
                <InputGroup alignItems={"center"}>
                  <InputLeftElement pointerEvents={"none"}>
                    <Icon as={FaUser} color="gray" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="name"
                    placeholder="First Name"
                    w={"100%"}
                    autoComplete="off"
                    border={"1px solid gray"}
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
                  />
                </InputGroup>
                {isSubmitted && (
                  <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={"2rem"}
                ml={"auto"}
                mr={"auto"}
                isInvalid={isSubmitted && errors.lastname}
              >
                <InputGroup alignItems={"center"}>
                  <InputLeftElement pointerEvents={"none"}>
                    <Icon as={FaUser} color="gray" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Last Name"
                    w={"100%"}
                    border={"1px solid gray"}
                    value={lastname}
                    autoComplete="off"
                    onChange={(e) => setLastname(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
                  />
                </InputGroup>
                {isSubmitted && (
                  <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                )}
              </FormControl>
            </Flex>
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
            <FormControl
              mb={"2rem"}
              w={"90%"}
              ml={"auto"}
              mr={"auto"}
              isInvalid={isSubmitted && errors.institution}
            >
              <Flex pos={"relative"}>
                <Input
                  type="text"
                  name="institution"
                  value={institution}
                  onChange={handleInputChange}
                  placeholder="Type Institution name"
                  border={"1px solid gray"}
                  autoComplete="off"
                />
                <Box
                  pos={"absolute"}
                  top={"50%"}
                  right={"10px"}
                  transform={"translateY(-50%)"}
                  variant={"ghost"}
                  onClick={() => setInstitution("")}
                >
                  <CloseIcon />
                </Box>
              </Flex>
              {isSubmitted && (
                <FormErrorMessage>{errors.institution}</FormErrorMessage>
              )}
              {isDropdownOpen && (
                <List
                  zIndex={1000}
                  mt={"1em"}
                  maxHeight={"30em"}
                  overflowY={"auto"}
                  backgroundColor={"hsl(32, 45%, 94%)"}
                  maxWidth={"60em"}
                  position={"absolute"}
                >
                  {suggestions.map((res, index) => (
                    <ListItem
                      h={"50%"}
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the document click event from firing
                        setInstitution(res.name);
                        setIsDropDownOpen(false);
                      }}
                    >
                      {res.name}
                    </ListItem>
                  ))}
                </List>
              )}
            </FormControl>
            {!isLoading ? (
              <Flex justify={"center"} my={"2em"}>
                <Button
                  type="submit"
                  backgroundColor={
                    firstname.length < 1 ||
                    lastname.length < 1 ||
                    email.length < 1 ||
                    password.length < 1 ||
                    institution.length < 1
                      ? "grey"
                      : "red"
                  }
                  color={"white"}
                  w={"auto"}
                >
                  Get started
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
          </Form>
          <Flex mb={"2em"} mx={"1.5em"}>
            <Text
              pr={".4em"}
              fontSize={{ base: ".6rem", lg: ".9rem", xl: ".9rem" }}
            >
              Already have an account?
            </Text>
            <Link
              onClick={login}
              textAlign={"center"}
              color={"red"}
              fontSize={{ base: ".6rem", lg: ".9rem", xl: ".9rem" }}
            >
              Login
            </Link>
          </Flex>
        </Flex>
      </Flex>

      <Outlet />
    </div>
  );
}
