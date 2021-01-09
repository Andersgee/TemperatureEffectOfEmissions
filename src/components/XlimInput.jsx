import React, { useState } from "react";
import { withState } from "../state";
import { Box, Input, Typography } from "@material-ui/core";

const clamp = (x, a, b) => Math.max(a, Math.min(x, b));
const first = (v) => v[0];
const last = (v) => v[v.length - 1];

function slicedata(data, min, max) {
  const a = data.year.indexOf(min);
  const b = data.year.indexOf(max) + 1;

  return {
    ...data,
    year: data.year.slice(a, b),
    rawdata: data.rawdata.map((r) => r.slice(a, b)),
  };
}

function XlimInput(props) {
  const { parseddata } = props.state;
  const omin = first(parseddata.year);
  const omax = last(parseddata.year);

  const [min, setMin] = useState(omin);
  const [max, setMax] = useState(omax);

  const handleMin = (e) => {
    const newmin = clamp(e.target.value, omin, omax);
    setMin(newmin);
    props.setState({ data: slicedata(parseddata, newmin, max) });
  };

  const handleMax = (e) => {
    const newmax = clamp(e.target.value, omin, omax);
    setMax(newmax);
    props.setState({ data: slicedata(parseddata, min, newmax) });
  };

  return (
    <Box my={2} px={1} py={1} boxShadow={2} width={150}>
      <Box>
        <Typography variant="body1">X-axis</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Typography variant="body2">min</Typography>
        <Input
          style={{ width: 100 }}
          type="number"
          value={min}
          onChange={handleMin}
          min={omin}
          max={omax - 1}
          step={1}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Typography variant="body2">max</Typography>

        <Input
          style={{ width: 100 }}
          type="number"
          value={max}
          onChange={handleMax}
          min={omin + 1}
          max={omax}
          step={1}
        />
      </Box>
    </Box>
  );
}

export default withState(XlimInput);
