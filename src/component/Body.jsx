import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const Body = ({ bodyContent }) => {
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
  return (
    <SimpleGrid columns={1} overflowX={"hidden"} ml={"auto"} mr={"auto"}>
      {bodyContent.map((item, index) => (
        <Flex
          gap={"2rem"}
          align={"center"}
          flexDir={{
            base: index % 2 === 0 ? "column" : "column-reverse",
            md: index % 2 === 0 ? "column" : "column-reverse",
            lg: "row",
            xl: "row",
          }}
          mb={"3.125rem"}
          ml={"auto"}
          mr={"auto"}
          key={index}
        >
          {index % 2 === 0 ? (
            <>
              <Container
                as={motion.div}
                variants={SlideIn}
                initial={"initial"}
                whileInView={"animate"}
                transition={{ delay: 0.5, ease: "ease-in" }}
                viewport={{
                  once: true,
                }}
                maxW={"400px"}
              >
                <img src={item.image} alt={item.title} />
              </Container>
              <Container
                as={motion.div}
                variants={fadeIn}
                initial={"initial"}
                whileInView={"animate"}
                transition={{ delay: 0.8, ease: "ease-in" }}
                viewport={{
                  once: true,
                }}
                textAlign={{ base: "center", lg: "left", xl: "left" }}
              >
                <Heading fontFamily={"solo"} pb={"10px"}>
                  {item.title}
                </Heading>
                <Text
                  fontSize={{
                    base: "13px",
                    md: "16px",
                    lg: "16px",
                    xl: "16px",
                  }}
                >
                  {item.text}
                </Text>
              </Container>
            </>
          ) : (
            <>
              <Container
                as={motion.div}
                variants={fadeIn}
                initial={"initial"}
                whileInView={"animate"}
                transition={{ delay: 0.8, ease: "ease-in" }}
                viewport={{
                  once: true,
                }}
                textAlign={{ base: "center", lg: "left", xl: "left" }}
              >
                <Heading fontFamily={"solo"} pb={"10px"}>
                  {item.title}
                </Heading>
                <Text
                  fontSize={{
                    base: "13px",
                    md: "16px",
                    lg: "16px",
                    xl: "16px",
                  }}
                >
                  {item.text}
                </Text>
              </Container>
              <Container
                as={motion.div}
                variants={SlideIn}
                initial={"initial"}
                whileInView={"animate"}
                transition={{ delay: 0.5, ease: "ease-in" }}
                viewport={{
                  once: true,
                }}
                maxW={"400px"}
              >
                <img src={item.image} alt={item.title} />
              </Container>
            </>
          )}
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default React.memo(Body);
