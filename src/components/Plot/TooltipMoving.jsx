import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import SvgSquare from "./SvgSquare";

function sum0(v) {
  return v.reduce((a, b) => a + b, 0);
}

const round6 = (str) => Math.round(parseFloat(str) * 1000000) / 1000000;
const aspercent = (str, sum) =>
  Math.round((100 * parseFloat(str) * 10) / sum) / 10; //with one decimal

function undostackedvalues(gasesdatapoints) {
  return gasesdatapoints;
  /*
  for (let i = gasesdatapoints.length - 1; i > 0; i--) {
    gasesdatapoints[i].yLabel -= gasesdatapoints[i - 1].yLabel;
  }
  return gasesdatapoints;
  */
}

function splitdatapoints(activedatapoints, labels) {
  const activelabels = activedatapoints.map((dp, i) => labels[dp.datasetIndex]);
  const indextotal = activelabels.indexOf("total");
  let totaldatapoint = null;
  if (indextotal >= 0) {
    totaldatapoint = activedatapoints[indextotal];
    totaldatapoint.name = "total";
  }

  const gasesdatapoints = activedatapoints.filter(
    (dp, i) =>
      !(i === indextotal || labels[dp.datasetIndex].startsWith("scenario"))
  );
  for (let i = 0; i < gasesdatapoints.length; i++) {
    gasesdatapoints[i].name = labels[gasesdatapoints[i].datasetIndex];
  }

  const scenariodatapoints = activedatapoints.filter((dp, i) =>
    labels[dp.datasetIndex].startsWith("scenario")
  );
  for (let i = 0; i < scenariodatapoints.length; i++) {
    scenariodatapoints[i].name = labels[scenariodatapoints[i].datasetIndex];
  }

  return {
    gasesdatapoints: undostackedvalues(gasesdatapoints),
    totaldatapoint,
    scenariodatapoints,
  };
}

function gaspercentages(gasesdatapoints, totaldatapoint) {
  //this gets the y value as a promille of total
  const p = gasesdatapoints.map((dp) =>
    Math.round((1000 * dp.yLabel) / totaldatapoint.yLabel)
  );

  // this gets the percentage difference from previous value to this
  // (rounded to promille expressed in percentage)
  let percentages = p.slice(0); //copy
  for (let i = 1; i < percentages.length; i++) {
    percentages[i] = Math.round(p[i] - p[i - 1]) / 10;
  }

  return percentages;
}

export default function TooltipMoving(props) {
  const year = props.datapoints[0].xLabel; //they all have the right year as xLabel
  const {
    gasesdatapoints,
    totaldatapoint,
    scenariodatapoints,
  } = splitdatapoints(props.datapoints, props.labels);

  console.log("scenariodatapoints: ", scenariodatapoints);
  const percentages = gaspercentages(gasesdatapoints, totaldatapoint);

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
      <Typography>
        <Box fontWeight={700}>{year}</Box>
      </Typography>
      {totaldatapoint && (
        <Box>
          <Typography>Contribution to temperature change</Typography>
          <Typography>
            <Box fontWeight={500}>
              Total: {Math.round(100000000 * totaldatapoint.yLabel) / 100} μC
            </Box>
          </Typography>
          <Box my={1}>
            <Divider />
          </Box>
          <Typography>From sources</Typography>

          {gasesdatapoints.map((dp, i) => (
            <Box key={i} display="flex" justifyContent="space-between">
              <Typography variant="body1">{dp.name}:</Typography>
              <Typography>
                <Box fontWeight={500}>{percentages[i]}%</Box>
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {scenariodatapoints.length > 0 && (
        <Box>
          <Box my={1}>
            <Divider />
          </Box>
          <Typography>Scenario contribution to temperature change</Typography>
          {scenariodatapoints.map((dp, i) => (
            <Box key={i} display="flex" justifyContent="space-between">
              <Typography variant="body1">{dp.name}:</Typography>
              <Typography>
                <Box fontWeight={500}>
                  {Math.round(100000000 * dp.yLabel) / 100} μC
                </Box>
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
