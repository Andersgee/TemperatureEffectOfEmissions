import React, { useState } from "react";
import { withState } from "../state";
import { Box, Input, Typography } from "@material-ui/core";
import { clamp, first, last } from "../js/utils";

function scenariodata(data, min, max, scenario) {
  const a = data.year.indexOf(min);
  const b = data.year.indexOf(max) + 1;

  return { ...scenario, startindex: a, len: b - a };
}

function ScenarioSettings(props) {
  const { parseddata, data, scenario } = props.state;
  const omin = first(parseddata.year);
  const omax = last(parseddata.year);

  const [min, setMin] = useState(omin);
  const [len, setLen] = useState(scenario.len);
  const [percent, setPercent] = useState(scenario.p);
  const [deltaT, setDeltaT] = useState(scenario.deltaT);
  const [max, setMax] = useState(min + len);

  const handleMin = (e) => {
    const newmin = clamp(e.target.value, omin, omax - 1);
    const newmax = clamp(newmin + len, omin + 1, omax);
    setMin(newmin);
    setMax(newmax);
    props.setState({ scenario: scenariodata(data, newmin, newmax, scenario) });
  };

  const handleMax = (e) => {
    const newmax = clamp(e.target.value, omin + 1, omax);
    const newmin = Math.min(min, newmax - 1);
    setMin(newmin);
    setMax(newmax);
    props.setState({ scenario: scenariodata(data, newmin, newmax, scenario) });
  };

  const handleLen = (e) => {
    const newlen = Math.max(1, e.target.value);
    setLen(newlen);
    const newmax = clamp(min + newlen, omin + 1, omax);
    props.setState({ scenario: scenariodata(data, min, newmax, scenario) });
  };

  const handlePercent = (e) => {
    const newpercent = clamp(e.target.value, -20, 20);
    setPercent(newpercent);
    props.setState({ scenario: { ...scenario, p: newpercent } });
  };

  const handleDeltaT = (e) => {
    const E = Math.pow(10, -9);
    const newdeltaT = clamp(e.target.value, -200, 200);
    console.log("handleDeltaT: ", newdeltaT);
    setDeltaT(newdeltaT);
    props.setState({ scenario: { ...scenario, deltaT: newdeltaT * E } });
  };

  return (
    <Box my={2} px={1} py={1} boxShadow={2} width={150}>
      <Box>
        <Typography variant="body1">scenario settings</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">start</Typography>
        <Input
          style={{ width: 80 }}
          type="number"
          value={min}
          onChange={handleMin}
          min={omin}
          max={omax - 1}
          step={1}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">length</Typography>

        <Input
          style={{ width: 80 }}
          type="number"
          value={len}
          onChange={handleLen}
          min={1}
          //max={omax}
          step={1}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">percent</Typography>

        <Input
          style={{ width: 80 }}
          type="number"
          value={percent}
          onChange={handlePercent}
          min={-20}
          max={20}
          step={1}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">deltaT (10^-9)</Typography>

        <Input
          style={{ width: 80 }}
          type="number"
          value={deltaT}
          onChange={handleDeltaT}
          min={-200}
          max={200}
          step={1}
        />
      </Box>
    </Box>
  );
}

export default withState(ScenarioSettings);
