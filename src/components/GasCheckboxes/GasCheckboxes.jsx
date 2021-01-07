import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { withState } from "../../state";
import Checkbox from "@material-ui/core/Checkbox";

function filterdata(parseddata, checked) {
  const data = {
    filename: parseddata.filename,
    gasnames: parseddata.gasnames.filter((d, i) => checked[i]),
    headings: parseddata.headings.filter((d, i) => checked[i]),
    rawdata: parseddata.rawdata.filter((d, i) => checked[i]),
    year: parseddata.year,
  };
  return data;
}

function GasCheckboxes(props) {
  const { parseddata } = props.state;
  const { setState } = props;
  const [checked, setChecked] = useState([true, true, true, true]);

  const handleChange = (i) => (event) => {
    const newchecked = checked.slice(0);
    newchecked[i] = event.target.checked;
    console.log("newchecked: ", newchecked);
    setChecked(newchecked);
  };

  useEffect(() => {
    if (checked.some((b) => b == true)) {
      console.log("checked changed, parseddata: ", parseddata);
      const newdata = filterdata(parseddata, checked);
      setState({ data: newdata });
    }
  }, [checked, parseddata]);

  return (
    parseddata && (
      <Box my={2} borderBottom={1} borderColor="grey.500" width={500}>
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
