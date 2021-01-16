import React, { useState, useEffect } from "react";
import { withState } from "../state";
import { Box, Input, Typography } from "@material-ui/core";
import { mix, clamp, first, last } from "../js/utils";
import Checkbox from "@material-ui/core/Checkbox";

/*
function scenariodata(data, min, max, scenario) {
  const a = data.year.indexOf(min);
  const b = data.year.indexOf(max) + 1;

  return { ...scenario, startindex: a, len: b - a };
}
*/
function scenariodata(data, min, max, scenario) {
  const a = data.year.indexOf(min);
  const len = max - min + 1;
  return { ...scenario, startindex: a, len: len };
}

function ScenarioSettings(props) {
  const { parseddata, data, scenario } = props.state;
  const { setState } = props;
  const omin = first(parseddata.year);
  const omax = last(parseddata.year);

  const [min, setMin] = useState(omin);
  const [len, setLen] = useState(scenario.len);
  const [percent, setPercent] = useState(scenario.p);
  const [timetozero, setTimetozero] = useState(scenario.timetozero);

  const [checked, setChecked] = useState(true);

  const handleChecked = (e) => {
    console.log("SHOW IS NOW ", e.target.checked);
    setChecked(e.target.checked);
    setState({ scenario: { ...scenario, show: e.target.checked } });
  };

  useEffect(() => {
    //const startyear = Math.round((omin + omax) / 2);
    const omin = first(parseddata.year);
    const omax = last(parseddata.year);
    const startyear = Math.round(mix(omin, omax, 2 / 3));
    const newmax = startyear + len;
    setMin(startyear);
    setState({ scenario: scenariodata(data, startyear, newmax, scenario) });
  }, [parseddata]);

  const handleMin = (e) => {
    const newmin = parseInt(e.target.value);
    const newmax = newmin + len;
    setMin(newmin);
    setState({ scenario: scenariodata(data, newmin, newmax, scenario) });
  };

  const handleLen = (e) => {
    const newlen = parseInt(e.target.value);
    const newmax = min + newlen;
    setLen(newlen);
    setState({ scenario: scenariodata(data, min, newmax, scenario) });
  };

  const handlePercent = (e) => {
    const newpercent = parseInt(e.target.value);
    setPercent(newpercent);
    setState({ scenario: { ...scenario, p: newpercent } });
  };

  const handleTimetozero = (e) => {
    const newtimetozero = parseInt(e.target.value);
    setTimetozero(newtimetozero);
    setState({ scenario: { ...scenario, timetozero: newtimetozero } });
  };

  return (
    <Box my={2} px={1} py={1} boxShadow={2} width={200}>
      <Box>
        <Typography variant="body1">Scenario Settings</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Show Lines</Typography>
        <Box width={90}>
          <Checkbox
            checked={checked}
            onChange={handleChecked}
            color="primary"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">start</Typography>
        <Input
          style={{ width: 80 }}
          type="number"
          value={min}
          onChange={handleMin}
          inputProps={{ min: omin + 1, max: omax, step: 1 }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">length</Typography>

        <Input
          style={{ width: 80 }}
          type="number"
          value={len}
          onChange={handleLen}
          inputProps={{ min: 1, step: 1 }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">percent</Typography>

        <Input
          style={{ width: 80 }}
          type="number"
          value={percent}
          onChange={handlePercent}
          inputProps={{ min: -20, max: 20, step: 1 }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">time to zero</Typography>

        <Input
          style={{ width: 80 }}
          type="number"
          value={timetozero}
          onChange={handleTimetozero}
          inputProps={{ min: 1, step: 1 }}
        />
      </Box>
    </Box>
  );
}

export default withState(ScenarioSettings);
