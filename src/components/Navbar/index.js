import React from "react";
import UploadButton from "../UploadButton";

import { Button, Box, Typography, Grid, Container } from "@material-ui/core";
import Tooltip from "../Tooltip";

function But(props) {
  return (
    <Tooltip title={props.title}>
      <Button variant="text" href={props.href}>
        {props.title}
      </Button>
    </Tooltip>
  );
}

export default function Navbar() {
  return (
    <Box py={1} mb={1} bgcolor="#eceff4">
      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <But title="Home" href="/" />
          <But title="About" href="/about" />
        </Box>
      </Container>
    </Box>
  );
}
