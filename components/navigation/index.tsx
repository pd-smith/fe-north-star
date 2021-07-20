import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";
const navLinks = [
  {
    children: "Home",
    href: "/",
  },
];
export default function Navigation(): JSX.Element {
  return (
    <Box padding="10">
      <nav>
        <UnorderedList styleType="none">
          {navLinks.map((props) => (
            <ListItem key={props.href}>
              <Link as={NextLink} {...props} />
            </ListItem>
          ))}
        </UnorderedList>
      </nav>
    </Box>
  );
}
