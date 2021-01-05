import React from "react";
import { SwatchesPicker } from "react-color";
import { Typography, Grid } from "@material-ui/core";
import { withPlotcolors } from "../../state/plotcolors";

const copy = (v) => v.slice(0);

function Pickers(props) {
  const handleChange = (i) => (color) => {
    let newcolors = copy(props.plotcolors);
    newcolors[i] = color.hex;
    props.setPlotcolors(newcolors);
  };

  return (
    <Grid container spacing={3} justify="center">
      {props.headings.map((heading, i) => (
        <Grid item key={i}>
          <Typography variant="h6">{heading}</Typography>
          <SwatchesPicker onChange={handleChange(i)} />
        </Grid>
      ))}
    </Grid>
  );
}

export default withPlotcolors(Pickers);
