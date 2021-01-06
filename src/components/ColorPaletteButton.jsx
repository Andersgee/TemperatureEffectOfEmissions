import React from "react";
import { Tooltip, Button } from "@material-ui/core";
import ColorLensIcon from "@material-ui/icons/ColorLens";

export default function ColorPaletteButton(props) {
  return (
    <Tooltip title="Choose Colors" aria-label="choose colors">
      <Button color="primary" variant="contained" onClick={props.onClick}>
        <ColorLensIcon />
      </Button>
    </Tooltip>
  );
}
