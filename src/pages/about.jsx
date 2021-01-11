import React from "react";
import SEO from "../components/SEO";
import { Container, Typography } from "@material-ui/core";
import Link from "../components/Link";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <SEO title={"About"} />
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography variant="body1">
          This website shows temperature effect of emissions according to a
          model specialized on different gases. It allows uploading your own
          excel file with emissions over years for different gases via the
          Upload button.
        </Typography>
        <Typography variant="body1">
          See <Link to="https://www.google.se">[some article]</Link> for details
          about the used model.
        </Typography>
      </Container>
    </>
  );
}
