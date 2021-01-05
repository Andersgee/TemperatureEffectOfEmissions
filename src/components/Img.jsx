import React from "react";
import Img from "gatsby-image";
import { Box } from "@material-ui/core";

function ImgFluid(props, ref) {
  return (
    <Box width="100%" ref={ref}>
      <Img
        fluid={props.fluid}
        imgStyle={{ objectFit: "contain" }}
        style={{ height: "100%" }}
        alt={props.alt}
      />
    </Box>
  );
}

export default React.forwardRef(ImgFluid);
