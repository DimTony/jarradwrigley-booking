import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/favico.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mailtoLink, setMailtoLink] = useState(
    "mailto:bookings@ashandchooka.com"
  );

  const handleClick = () => {
    // Generate a random number each time the button is clicked
    const randomTicketNumber = Math.floor(100000 + Math.random() * 900000);
    const updatedMailtoLink = `mailto:bookings@ashandchooka.com?subject=Support Ticket ${randomTicketNumber} Initiated!`;
    setMailtoLink(updatedMailtoLink);
  };
  return (
    <>
      {/* <Box> */}
      <HStack
        h="3.5rem"
        w="100%"
        backdropFilter="blur(16px) saturate(180%)"
        webkitbackdropfilter="blur(16px) saturate(180%)"
        bg="rgba(0, 148, 255, 0.52)"
        border="1px solid rgba(209, 213, 219, 0.3)"
        borderRadius="30px"
        py="0.5rem"
        pl="0.7rem"
        pr="2rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link to="/">
          <Image src={logo} alt="logo" h="3rem" w="auto" />
        </Link>

        <a href={mailtoLink} onClick={handleClick}>
          <Button variant="ghost">Support</Button>
        </a>
      </HStack>
      {/* </Box> */}
    </>
  );
};

export default Navbar;
