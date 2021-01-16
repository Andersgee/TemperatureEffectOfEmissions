import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Typography, Link } from "@material-ui/core";
import Plot from "./Plot";
import TemperaturePlot from "./TemperaturePlot";
import useDefaultData from "../hooks/useData";
import { withState } from "../state";
import Colorpickers from "./Colorpickers";
import UploadButton from "./UploadButton";
import UploadButtonHelp from "./UploadButtonHelp";
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
          <Box display="flex" justifyContent="center">
            <UploadButton />
            <UploadButtonHelp />
          </Box>
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
            <Grid container spacing={4} justify="center">
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
            {showpickers && <Colorpickers headings={parseddata.headings} />}
            <Plot />
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
            >
              The temperature impact has been calculated using the methodology
              described in{" "}
              <Link href="https://www.nature.com/articles/nclimate1496">
                “Equivalence of greenhouse-gas emissions for peak temperature
                limits”
              </Link>{" "}
              by Smith et al.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default withState(Layout);
