import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { withState } from "../../state";
import Checkbox from "@material-ui/core/Checkbox";

function trues(N) {
  return new Array(N).fill(true);
}

function copy(x) {
  return x.slice(0);
}

function anytrue(x) {
  return x.some((b) => b == true);
}

function filterdata(parseddata, checked) {
  const data = {
    ...parseddata,
    gasnames: parseddata.gasnames.filter((d, i) => checked[i]),
    headings: parseddata.headings.filter((d, i) => checked[i]),
    rawdata: parseddata.rawdata.filter((d, i) => checked[i]),
  };
  return data;
}

function GasCheckboxes(props) {
  const { parseddata } = props.state;
  const { setState } = props;

  const Ngases = parseddata ? parseddata.headings.length : 0;
  const [checked, setChecked] = useState(trues(Ngases));

  const handleChange = (i) => (event) => {
    const newchecked = copy(checked);
    newchecked[i] = event.target.checked;
    //forbid unchecking everything
    if (anytrue(newchecked)) setChecked(newchecked);
  };

  useEffect(() => {
    const Ngases = parseddata ? parseddata.headings.length : 0;
    setChecked(trues(Ngases));
  }, [parseddata]);

  useEffect(() => {
    const newdata = filterdata(parseddata, checked);
    setState({ data: newdata });
  }, [checked, parseddata]);

  return (
    parseddata && (
      <Box my={2} width={500} boxShadow={2}>
        <Typography variant="h6" align="left" component="span">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={1}
            borderColor="grey.500"
          >
            <Box width={50}></Box>
            <Box width={100}>Gas</Box>
            <Box width={350}>Name</Box>
          </Box>
        </Typography>
        <Typography variant="body1" align="left" component="span">
          {checked.map((v, i) => (
            <Box
              key={i}
              bgcolor={i % 2 == 0 ? "#F4F4F2" : "#ffffff"}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box width={50}>
                <Checkbox
                  checked={checked[i]}
                  onChange={handleChange(i)}
                  color="primary"
                />
              </Box>
              <Box width={100}>{parseddata.gasnames[i]}</Box>
              <Box width={350}>{parseddata.headings[i]}</Box>
            </Box>
          ))}
        </Typography>
      </Box>
    )
  );
}

export default withState(GasCheckboxes);
