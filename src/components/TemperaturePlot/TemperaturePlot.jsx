import React, { useState, useRef, useEffect } from "react";
//import { defaults, Line } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Box } from "@material-ui/core";
import TooltipMoving from "./TooltipMoving";
import { withState } from "../../state";
import { makeplotdata } from "../../js/deltatemp";
import Settings from "./Settings";

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
          stacked: false,
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
            minRotation: 90,
            //callback: function (value, index, values) {return value % 2 === 0 ? value : "";},
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
  const { data, plotcolors } = props.state;

  const [startyear, setStartyear] = useState(0);
  const [percentage, setPercentage] = useState(-5);

  const [plotdata, setPlotdata] = useState(null);
  useEffect(() => {
    if (data) {
      setPlotdata(makeplotdata(data, plotcolors, startyear, percentage));
    }
  }, [data, plotcolors, startyear, percentage]);

  const boxref = useRef();
  const [datapoints, setDatapoints] = useState(null);
  const [mousexy, setMousexy] = useState([0, 0]);
  const [show, setShow] = useState(false);
  const indexlabels = plotdata ? plotdata.datasets.map((ds) => ds.label) : [];

  const customtooltip = (el) => {
    setDatapoints(el.dataPoints);
  };

  const options = makeoptions(customtooltip);

  const onEnter = () => setShow(true);
  const onLeave = () => setShow(false);
  const onMove = (e) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x_max = window.innerWidth - rect.left - 350;
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.min(x_max, x);
    setMousexy([x, y]);
  };

  return (
    <Box mt={3}>
      <Settings setStartyear={setStartyear} setPercentage={setPercentage} />
      <Box
        position="relative"
        ref={boxref}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
      >
        <TooltipMoving
          show={show}
          xy={mousexy}
          datapoints={datapoints}
          indexlabels={indexlabels}
          //indexcolors={props.state.plotcolors}
        />
        {plotdata && <Line data={plotdata} options={options} />}
      </Box>
    </Box>
  );
}

export default withState(LineChart);
