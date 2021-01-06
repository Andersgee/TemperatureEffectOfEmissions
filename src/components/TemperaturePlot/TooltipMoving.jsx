import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function TooltipMoving(props) {
  const show = props.show && props.datapoints && props.datapoints.length > 0;

  return show ? (
    <Box
      width={350}
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
      <Typography>series</Typography>
      {props.datapoints
        .map((dp, i) => (
          <Box key={i} display="flex" justifyContent="space-between">
            <Typography variant="body1">{props.indexlabels[i]}:</Typography>
            <Typography>{dp.value}</Typography>
          </Box>
        ))
        .reverse()}
    </Box>
  ) : null;
}
