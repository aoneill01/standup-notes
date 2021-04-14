import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";

const Layout: React.FunctionComponent = ({ children }) => (
  <>
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title="Notes"
      meta={[{ name: "charSet", content: "utf-8" }]}
    />
    <title>Notes</title>
    <AppBar position="sticky">
      <Toolbar>
        <Typography component="h1" variant="h6">
          Notes
        </Typography>
      </Toolbar>
    </AppBar>
    <Container fixed>{children}</Container>
  </>
);

export default Layout;
