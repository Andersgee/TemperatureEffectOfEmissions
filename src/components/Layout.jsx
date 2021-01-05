import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Tooltip, Button } from "@material-ui/core";
import Plot from "./Plot";
import useDefaultData from "../hooks/useData";
import rfe from "../js/rfe1";
import { withState } from "../state";
import Colorpickers from "./Colorpickers";
import UploadButton from "./UploadButton";
import DownloadButton from "./DownloadButton";
import ColorLensIcon from "@material-ui/icons/ColorLens";

const randomhex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const makeplotdata = (data, colors) => {
  const datasets = [];
  for (let i = 0; i < data.headings.length; i++) {
    datasets.push({
      label: data.headings[i],
      data: rfe(data.gasnames[i], data.rawdata[i]),
      backgroundColor: colors[i] || randomhex(),
      fill: "-1",
    });
  }
  datasets[0].fill = "origin"; //special first

  const alldata = {
    headings: data.headings, //not needed for plot but for convenience
    labels: data.year,
    datasets: datasets,
  };

  return alldata;
};

function Layout(props) {
  const { data, plotcolors } = props.state;
  const setState = props.setState;
  const defaultdata = useDefaultData();
  const [plotdata, setPlotdata] = useState(null);
  const [showpickers, setShowpickers] = useState(false);

  useEffect(() => {
    if (!defaultdata.isLoading) {
      setState({ data: defaultdata.data });
    }
  }, [defaultdata, setState]);

  useEffect(() => {
    if (data) {
      setPlotdata(makeplotdata(data, plotcolors));
    }
  }, [data, plotcolors]);

  const togglepickers = () => {
    setShowpickers(!showpickers);
  };

  return (
    <Container>
      <UploadButton />
      {plotdata ? (
        <>
          <Box py={3}>{<Plot data={plotdata} />}</Box>
          <Box display="flex" justifyContent="space-between">
            <Tooltip title="Choose Colors" aria-label="choose colors">
              <Button
                color="primary"
                variant="contained"
                onClick={togglepickers}
              >
                <ColorLensIcon />
              </Button>
            </Tooltip>
            <DownloadButton />
          </Box>

          <Box py={3}>
            {showpickers ? (
              <Colorpickers headings={plotdata.headings} />
            ) : (
              <Box minHeight={400}></Box>
            )}
          </Box>
        </>
      ) : (
        <Typography>No plot data</Typography>
      )}
    </Container>
  );
}

export default withState(Layout);
