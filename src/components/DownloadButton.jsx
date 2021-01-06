import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

export default function DownloadButton(props) {
  const handleClick = () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    const link = document.createElement("a");
    link.setAttribute("download", "TemperatureContributionFigure.png");
    link.setAttribute(
      "href",
      canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    );
    link.click();
  };

  return (
    <>
      <Tooltip title="Save Image" aria-label="save image">
        <Button onClick={handleClick} color="primary" variant="contained">
          <SaveIcon />
        </Button>
      </Tooltip>
    </>
  );
}
