import { Container } from "@material-ui/core";
import React from "react";

const Layout: React.FunctionComponent = ({ children }) => (
  <Container fixed>{children}</Container>
);

export default Layout;
