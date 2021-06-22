import React from "react";
import { Flex, Box } from "@chakra-ui/layout";
import Navigation from "../navigation";

interface ResponsiveLayoutProps {
  children: React.ReactNode | React.ReactNodeArray;
}
export default function ResponsiveLayout({
  children,
}: ResponsiveLayoutProps): JSX.Element {
  return (
    <Flex direction={{ base: "column", lg: "row" }} minHeight="100vh">
      <Box backgroundColor="bisque" minHeight="75px" minWidth="300px">
        <Navigation />
      </Box>
      <Box margin="10" backgroundColor="white" width="full" flexGrow={1}>
        {children}
      </Box>
    </Flex>
  );
}
