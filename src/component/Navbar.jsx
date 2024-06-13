import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { motion } from "framer-motion";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {Divide as Hamburger} from "hamburger-react";

export default function Navbar() {
  const componentButton = {
    bgColor: "#213655",
    borderRadius: "0",
    color: "white",
    ":hover": {
      color: "white",
      bgColor: "#f2575d",
    },
  };

  const secondRegister = {
    color: "#213655",
    border: "2px solid #213655 ",
    bgColor: "transparent",
    borderRadius: "0",
    ":hover": {
      bgColor: "#f2575d",
      color: "white",
      border: "3px solid #f2575d ",
    },
  };

  const BUTTON_VARIANT = "ghost";
  const DISPLAY_NONE = "none";
  const DISPLAY_FLEX = "flex";

  const [display, setDisplay] = useState(DISPLAY_NONE);
  const [toggled, setToggled] = useState(false);
  const [background, setBackground] = useState("hsl(32, 45%, 94%)");
  const [shadow, setShadow] = useState("");
  const changeBg = (e) => {
    var scrollValue = window.scrollY;
    if (scrollValue > 100) {
      setBackground("white");
      setShadow("0px 2px 10px 0px rgba(158,161,161,1)");
    } else {
      setBackground("hsl(32, 45%, 94%)");
      setShadow("");
    }
  };

  
const location = useLocation();
  useEffect(() => {
    window.addEventListener("scroll", changeBg);
  }, []);

  useEffect(() => {
    setDisplay(toggled ? DISPLAY_FLEX : DISPLAY_NONE);
  }, [toggled]);

  const handleNavLinkClick = () => {
    setDisplay(DISPLAY_NONE);
  };

  useEffect(() => {
    setToggled(false);
  }, [location]);
 

  return (
    <div>
      <Flex
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        py={"20px"}
        boxShadow={shadow}
        backgroundColor={background}
        w={"100%"}
        pos={"fixed"}
        zIndex={100}
        top={"0px"}
        transition={"all 1s"}
      >
        <Box
          mx={{ base: "3%", md: "3%", lg: "5%", xl: "5%" }}
          w={"100%"}
          mt={"10px"}
          pl={"1rem"}
        >
          <NavLink to={"/"}>
            <img src={logo} alt="logo" />
          </NavLink>
        </Box>
        <Spacer />
        <Flex display={{ base: "none", md: "none", lg: "flex", xl: "flex" }}>
          <NavLink to={"/construction"}>
            <Button
              as={"a"}
              variant={BUTTON_VARIANT}
              _hover={{ color: "red" }}
              aria-label="About"
              w={"100%"}
              mr={{ base: "0", md: "0", lg: "50px", xl: "50px" }}
            >
              ABOUT
            </Button>
          </NavLink>
          <NavLink
            to={"/construction"}
            style={({ isActive }) => {
              return {
                color: isActive ? "Red" : "black",
              };
            }}
          >
            <Button
              as={"a"}
              variant={BUTTON_VARIANT}
              aria-label="Contact"
              _hover={{ color: "red" }}
              w={"100%"}
              mr={"50px"}
            >
              CONTACT
            </Button>
          </NavLink>
          <NavLink to={"/price"}>
            <Button
              as={"a"}
              variant={BUTTON_VARIANT}
              aria-label="Pricing"
              _hover={{ color: "red" }}
              w={"100%"}
            >
              PRICING
            </Button>
          </NavLink>
        </Flex>
        <Spacer />
        <Button
          display={{ base: "none", md: "none", lg: "flex", xl: "flex" }}
          sx={componentButton}
          mr={{ base: "30px", md: "50px", lg: "70px", xl: "100px" }}
          ml={{ base: "50px", md: "0px", lg: "30px", xl: "100px" }}
          px={{ base: "30px", md: "30px", lg: "40px", xl: "40px" }}
        >
          <NavLink to={"/login"}>Sign in</NavLink>
        </Button>
        <Box
          display={{ base: "flex", md: "flex", lg: "none", xl: "none" }}
          mr={"1rem"}
        >
          <Hamburger
            rounded
            direction="right"
            duration={0.5}
            toggled={toggled} 
            toggle={setToggled}
          />
        </Box>

        <Flex
          w={"100vw"}
          zIndex={20}
          h={"100vh"}
          bgColor={background}
          pos={"fixed"}
          top={"80px"}
          left={"0"}
          overflow={"auto"}
          flexDir={"column"}
          display={display}
          transition={"all 1s"}
        >
          <Flex flexDir={"column"} align={"center"} my={"100px"}>
            <NavLink to={"/construction"} onClick={handleNavLinkClick}>
              <Button
                as={"a"}
                variant={BUTTON_VARIANT}
                aria-label="About"
                w={"100%"}
                mb={"30px"}
              >
                ABOUT
              </Button>
            </NavLink>
            <NavLink to={"/construction"} onClick={handleNavLinkClick}>
              <Button
                as={"a"}
                variant={BUTTON_VARIANT}
                aria-label="Contact"
                w={"100%"}
                mb={"30px"}
              >
                CONTACT
              </Button>
            </NavLink>
            <NavLink to={"/price"} onClick={handleNavLinkClick}>
              <Button
                variant={BUTTON_VARIANT}
                aria-label="Pricing"
                w={"100%"}
                mb={"30px"}
              >
                PRICING
              </Button>
            </NavLink>
            {/* <Button sx={componentButton} mb={"30px"} w={"20%"}>
              Sign Up
            </Button> */}
            <Button variant={BUTTON_VARIANT} sx={secondRegister} w={"auto"}>
              Sign In
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
