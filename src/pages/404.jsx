import React from "react";
import SEO from "../components/SEO";
import { Container, Typography } from "@material-ui/core";
import Link from "../components/Link";

export default function Notfound() {
  return (
    <>
      <Container>
        <Typography variant="body1">404 - Not found</Typography>
        <Link to="/">Go to the main page</Link>
      </Container>
    </>
  );
}
