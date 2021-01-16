import React, { useState, useRef, useEffect } from "react";
//import { defaults, Line } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Typography, Box } from "@material-ui/core";
import TooltipMoving from "./TooltipMoving2";
import { withState } from "../../state";
import { makeplotdata } from "../../js/rfe1";

function makeoptions(customtooltip) {
  return {
    animation: {
      duration: 0,
    },
    aspectRatio: 21 / 9,
    devicePixelRatio: devicePixelRatio,
    scales: {
      yAxes: [
        {
          //stacked: true,
          position: "left",
          scaleLabel: {
            display: true,
            labelString: "°C",
            fontSize: 18,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "year",
            fontSize: 18,
          },
          ticks: {
            minRotation: 0,
            maxRotation: 0,
            //autoskip: true,
            //autoSkipPadding: 30,
            maxTicksLimit: 13,
            //callback: function (value, index, values) {return value % 2 === 0 ? value : "";},
            //callback: (value, index, values) => {return index % 5 === 0 ? value : null;},
          },
        },
      ],
    },
    tooltips: {
      enabled: false,
      mode: "index",
      intersect: false,
      axis: "x",
      animationDuration: 0,
      custom: customtooltip,
    },
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      //fontColor: 'blue',
      //text: 'Custom Chart Title'
    },
  };
}

function LineChart(props) {
  const { data, plotcolors, scenario } = props.state;

  //const scenario = { startindex: 117, len: 15, p: 0 };

  const [plotdata, setPlotdata] = useState(null);
  useEffect(() => {
    if (data) {
      const newplotdata = makeplotdata(data, plotcolors, scenario);
      setPlotdata(newplotdata);
    }
  }, [data, plotcolors, scenario]);

  const boxref = useRef();
  const [datapoints, setDatapoints] = useState(null);
  const [mousexy, setMousexy] = useState([0, 0]);
  const [show, setShow] = useState(false);

  const customtooltip = (el) => {
    //el.dataPoints has quite a bit of stuff in it.
    //but it doesnt have the name
    let dps = el.dataPoints;
    for (let i = 0; i < dps.length; i++) {
      dps[i].name = plotdata.names[dps[i].datasetIndex];
    }

    //console.log("dps: ", dps);
    setDatapoints(dps);
  };

  const options = makeoptions(customtooltip);

  const onEnter = () => setShow(true);
  const onLeave = () => setShow(false);
  const onMove = (e) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x_max = window.innerWidth - rect.left - 360;
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.min(x_max, x);
    setMousexy([x, y]);
  };

  return (
    <Box mt={3}>
      <Box
        position="relative"
        ref={boxref}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
      >
        {show && datapoints && (
          <TooltipMoving xy={mousexy} datapoints={datapoints} />
        )}
        {plotdata && <Line data={plotdata} options={options} />}
      </Box>
    </Box>
  );
}

export default withState(LineChart);
