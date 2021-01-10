import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import SvgSquare from "./SvgSquare";

function sum0(v) {
  return v.reduce((a, b) => a + b, 0);
}

const round6 = (str) => Math.round(parseFloat(str) * 1000000) / 1000000;
const aspercent = (str, sum) =>
  Math.round((100 * parseFloat(str) * 10) / sum) / 10; //with one decimal

export default function TooltipMoving(props) {
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
      <Typography>{props.datapoints[0].xLabel}</Typography>

      <Divider />
      <Typography>values</Typography>
      {props.datapoints.map((dp, i) => (
        <Box key={i} display="flex" justifyContent="space-between">
          <Typography variant="body1">
            {/*<SvgSquare color={props.indexcolors[i]} />*/}
            {props.labels[dp.datasetIndex]}:
          </Typography>

          <Typography>{round6(dp.yLabel * 1000)} mC</Typography>
        </Box>
      ))}
    </Box>
  );
}

//<Typography paragraph>Total effekt: {sum0(props.datapoints.map(dp=>parseFloat(dp.value)))}</Typography>
