import React from "react";
import SEO from "../components/SEO";
import { Container, Typography } from "@material-ui/core";
import Link from "../components/Link";
import { withData } from "../state/data";

function Index(props) {
  const name = props.pageContext.name;
  return (
    <>
      <SEO title={name} description={`description about ${name} goes here`} />
      <Container>
        <Typography variant="body1">
          This is a generated page with name {name} and its own SEO
        </Typography>
        <Typography variant="body1">
          This page also uses the redux state modified on homepage.
        </Typography>
        <Typography variant="body1">props.data.a: {props.data.a}</Typography>
        <Link to="/">Home</Link>
      </Container>
    </>
  );
}

export default withData(Index);
