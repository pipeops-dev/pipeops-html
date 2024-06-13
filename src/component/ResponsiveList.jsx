import {
  Box,
  Flex,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useBreakpointValue,
} from "@chakra-ui/react"
import { ChevronDownIcon, MinusIcon, AddIcon } from "@chakra-ui/icons"
import { NavLink } from "react-router-dom"
import React from "react"

function ResponsiveList({ title, links }) {
  const isSmallScreen = useBreakpointValue({ base: true, md: false })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const listItems = links.map((link, index) => (
    <NavLink
      to={link.path}
      _hover={{ color: "blue.500" }}
      key={index}
      onClick={scrollToTop}
    >
      <Flex direction={"column"} _hover={{ color: "blue.500" }}>
        {link.name}
      </Flex>
    </NavLink>
  ))

  if (isSmallScreen) {
    return (
      <Accordion allowToggle>
        <AccordionItem color={"white"} border='none'>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex='1' as='span' textAlign='left'>
                    {title}
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize='12px' />
                  ) : (
                    <AddIcon fontSize='12px' />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel>{listItems}</AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    )
  } else {
    return (
      <List color={"white"} spacing={4}>
        <ListItem fontFamily={"heading"}>{title}</ListItem>
        {listItems}
      </List>
    )
  }
}

export default React.memo(ResponsiveList)
