import React, { useRef } from "react";
import { Button, Tooltip } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

export default function DownloadButton(props) {
  const aref = useRef();
  const handleClick = () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    const link = aref.current;
    //const link = document.getElementById("canvasdownloadlink");
    link.setAttribute("download", "TemperatureContributionFigure.png");
    link.setAttribute(
      "href",
      canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    );
    link.click();
  };

  return (
    <>
      <a ref={aref} display="none" href="/Emissions.xlsx">
        canvasdownloadlink
      </a>
      <Tooltip title="Save Image" aria-label="save image">
        <Button onClick={handleClick} color="primary" variant="contained">
          <SaveIcon />
        </Button>
      </Tooltip>
    </>
  );
}
