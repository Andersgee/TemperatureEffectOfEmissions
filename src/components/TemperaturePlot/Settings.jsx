import React from "react";
import { Slider, Typography, Box } from "@material-ui/core";

function valuetext(value) {
  return `${value}`;
}

export default function Settings(props) {
  const setStartyear = (e, v) => props.setStartyear(v);
  const setPercentage = (e, v) => props.setPercentage(v);

  return (
    <Box width={400}>
      <Typography variant="body1">startyear</Typography>
      <Slider
        onChange={setStartyear}
        defaultValue={0}
        step={1}
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />
      <Typography variant="body1">yearly delta T percent change</Typography>
      <Slider
        onChange={setPercentage}
        defaultValue={0.0}
        step={0.01}
        min={-5}
        max={5}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
