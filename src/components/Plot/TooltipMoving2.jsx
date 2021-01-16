import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";

function splitdatapoints(dps) {
  let totaldp = false;
  let gasesdps = [];
  let scenariodps = [];

  for (let i = 0; i < dps.length; i++) {
    if (dps[i].name === "total") {
      totaldp = dps[i];
    } else if (dps[i].name.startsWith("scenario")) {
      scenariodps.push(dps[i]);
    } else if (dps[i].yLabel !== null) {
      gasesdps.push(dps[i]);
    } else {
      console.log("ELSE: ", dps[i]);
    }
  }
  return {
    gasesdps,
    totaldp,
    scenariodps,
  };
}

function gaspercentages(gasesdps, totaldp) {
  //this gets the y value as a promille of total
  const p = gasesdps.map((dp) => (1000 * dp.yLabel) / totaldp.yLabel);

  // this gets the percentage difference from previous value to this
  // (rounded to promille expressed in percentage)
  let percentages = new Array(p.length).fill(0);
  percentages[0] = Math.round(p[0]) / 10;
  for (let i = 1; i < percentages.length; i++) {
    percentages[i] = Math.round(p[i] - p[i - 1]) / 10;
  }
  return percentages;
}

const microwith2decimals = (x) => Math.round(100000000 * x) / 100;

export default function TooltipMoving(props) {
  const year = props.datapoints[0].xLabel; //they all have the right year as xLabel
  const { gasesdps, totaldp, scenariodps } = splitdatapoints(props.datapoints);

  const percentages = totaldp ? gaspercentages(gasesdps, totaldp) : [];

  return (
    <Box
      width={360}
      position="absolute"
      py={2}
      px={2}
      style={{
        transform: `translate(${props.xy[0]}px, ${props.xy[1]}px)`,
        overflow: "hidden",
        zIndex: "999",
      }}
      bgcolor="#fff"
    >
      <Typography component="span">
        <Box fontWeight={700}>{year}</Box>
      </Typography>
      {totaldp && (
        <Box>
          <Typography>Contribution to temperature change</Typography>
          <Typography component="span">
            <Box fontWeight={500}>
              Total: {microwith2decimals(totaldp.yLabel)} μC
            </Box>
          </Typography>
          <Box my={1}>
            <Divider />
          </Box>
          <Typography>From sources</Typography>

          {gasesdps
            .map((dp, i) => (
              <Box key={i} display="flex" justifyContent="space-between">
                <Typography variant="body1">{dp.name}:</Typography>
                <Typography component="span">
                  <Box fontWeight={500}>{percentages[i]}%</Box>
                </Typography>
              </Box>
            ))
            .reverse()}
        </Box>
      )}
      {scenariodps.length > 0 && (
        <Box>
          <Box my={1}>
            <Divider />
          </Box>
          <Typography>Scenario contribution to temperature change</Typography>
          {scenariodps.map((dp, i) => (
            <Box key={i} display="flex" justifyContent="space-between">
              <Typography variant="body1">{dp.name}:</Typography>
              <Typography component="span">
                <Box fontWeight={500}>{microwith2decimals(dp.yLabel)} μC</Box>
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
