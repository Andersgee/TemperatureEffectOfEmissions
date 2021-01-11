import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Typography } from "@material-ui/core";
import Plot from "./Plot";
import TemperaturePlot from "./TemperaturePlot";
import useDefaultData from "../hooks/useData";
import { withState } from "../state";
import Colorpickers from "./Colorpickers";
import UploadButton from "./UploadButton";
import DownloadButton from "./DownloadButton";
import ColorPaletteButton from "./ColorPaletteButton";
import GasCheckboxes from "./GasCheckboxes";
import Xlim from "./Xlim";
import ScenarioSettings from "./ScenarioSettings";
import Navbar from "./Navbar";

function Layout(props) {
  const { data, parseddata } = props.state;
  const { setState } = props;
  const defaultdata = useDefaultData();
  const [showpickers, setShowpickers] = useState(false);

  useEffect(() => {
    if (!defaultdata.isLoading) {
      setState({ parseddata: defaultdata.data });
    }
  }, [defaultdata]);

  useEffect(() => {
    setState({ data: parseddata });
  }, [parseddata]);

  const togglepickers = () => {
    setShowpickers(!showpickers);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box>
          <UploadButton />
          <Typography variant="body1" align="center">
            {defaultdata.isLoading
              ? "loading..."
              : data
              ? `now viewing ${data.filename}`
              : "No plot data"}
          </Typography>
        </Box>
        {data && (
          <Box my={2}>
            <Grid container spacing={4}>
              <Grid item>
                <GasCheckboxes />
              </Grid>
              <Grid item>
                <Xlim />
              </Grid>
              <Grid item>
                <ScenarioSettings />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between">
              <ColorPaletteButton onClick={togglepickers} />
              <DownloadButton />
            </Box>

            <Plot />
            {showpickers && <Colorpickers headings={data.headings} />}
            {/*<TemperaturePlot />*/}
          </Box>
        )}
      </Container>
    </>
  );
}

export default withState(Layout);
