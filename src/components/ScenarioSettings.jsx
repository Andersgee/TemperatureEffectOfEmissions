import React, { useState } from "react";
import { withState } from "../state";
import { Box, Input, Typography } from "@material-ui/core";
import { clamp, first, last } from "../js/utils";

function scenariodata(data, min, max) {
  const a = data.year.indexOf(min);
  const b = data.year.indexOf(max) + 1;

  return { startindex: a, len: b - a, p: 0 };
}

function ScenarioSettings(props) {
  const { parseddata, data } = props.state;
  const omin = first(parseddata.year);
  const omax = last(parseddata.year);

  const [min, setMin] = useState(omin);
  const [max, setMax] = useState(omax);

  const handleMin = (e) => {
    const newmin = clamp(e.target.value, omin, omax - 1);
    const newmax = Math.max(newmin + 1, max);
    setMin(newmin);
    setMax(newmax);
    props.setState({ scenario: scenariodata(data, newmin, newmax) });
  };

  const handleMax = (e) => {
    const newmax = clamp(e.target.value, omin + 1, omax);
    const newmin = Math.min(min, newmax - 1);
    setMin(newmin);
    setMax(newmax);
    props.setState({ scenario: scenariodata(data, newmin, newmax) });
  };

  return (
    <Box my={2} px={1} py={1} boxShadow={2} width={150}>
      <Box>
        <Typography variant="body1">scenario settings</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Typography variant="body2">from</Typography>
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
        <Typography variant="body2">to</Typography>

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

export default withState(ScenarioSettings);
