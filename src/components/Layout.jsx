import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import Plot from "./Plot";
import TemperaturePlot from "./TemperaturePlot";
import useDefaultData from "../hooks/useData";
import { withState } from "../state";
import Colorpickers from "./Colorpickers";
import UploadButton from "./UploadButton";
import DownloadButton from "./DownloadButton";
import ColorPaletteButton from "./ColorPaletteButton";

function Layout(props) {
  const { data } = props.state;
  const { setState } = props;
  const defaultdata = useDefaultData();
  const [showpickers, setShowpickers] = useState(false);

  useEffect(() => {
    if (!defaultdata.isLoading) {
      setState({ data: defaultdata.data });
    }
  }, [defaultdata, setState]);

  const togglepickers = () => {
    setShowpickers(!showpickers);
  };

  return (
    <Container>
      <Box>
        <UploadButton />
        <Typography variant="body1" align="center">
          {data ? `now viewing ${data.filename}` : "No plot data"}
        </Typography>
      </Box>

      {data && (
        <Box my={2}>
          <Box display="flex" justifyContent="space-between">
            <ColorPaletteButton onClick={togglepickers} />
            <DownloadButton />
          </Box>

          <Plot />
          {showpickers && <Colorpickers headings={data.headings} />}
          <TemperaturePlot />
        </Box>
      )}
    </Container>
  );
}

export default withState(Layout);
