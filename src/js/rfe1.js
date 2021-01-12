import { ghgs } from "./ghgs";

function cumsum(v) {
  let res = new Array(v.length);
  let sum = 0;
  for (let i = 0; i < v.length; i++) {
    sum = sum + v[i];
    res[i] = sum;
  }
  return res;
}

function vecmul(v, k) {
  let res = new Array(v.length);
  for (let i = 0; i < v.length; i++) {
    res[i] = v[i] * k;
  }
  return res;
}

function vecadd(vs) {
  //sum all vectors elementwise, return a single vector
  let maxlen = Math.max(...vs.map((v) => v.length));
  let res = new Array(maxlen).fill(0);
  for (let n = 0; n < vs.length; n++) {
    for (let i = 0; i < vs[n].length; i++) {
      res[i] += vs[n][i];
    }
  }

  return res;
}

export function rfe(gasname, tons) {
  if (!ghgs.hasOwnProperty(gasname)) {
    alert(`the gas ${gasname} is not supported`);
    return [];
  }

  const factor = ghgs[gasname].k;
  if (ghgs[gasname].longlived) {
    return vecmul(cumsum(tons), factor);
  } else {
    return vecmul(tons, factor);
  }
}

const randomhex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

function rangef(n, func) {
  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = func(i);
  }
  return a;
}

function dataslice(data, a, b) {
  return {
    ...data,
    year: data.year.slice(a, b),
    rawdata: data.rawdata.map((r) => r.slice(a, b)),
  };
}

function scenarioconstant(sumtemp, scenario) {
  const { startindex, len } = scenario;
  const N = sumtemp.length;
  const firstvalue = sumtemp[startindex];
  const firstdelta = sumtemp[startindex + 1] - sumtemp[startindex];

  const before = new Array(startindex).fill(null);
  const line = rangef(len, (i) => firstvalue + firstdelta * i);

  let scenarioline = before.concat(line);
  return scenarioline;
}

function scenarioexponential(sumtemp, scenario) {
  const { startindex, len, p } = scenario;
  const N = sumtemp.length;
  const firstvalue = sumtemp[startindex];
  const firstdelta = sumtemp[startindex + 1] - sumtemp[startindex];

  const before = new Array(startindex).fill(null);
  let line = new Array(len);
  line[0] = firstvalue;
  let r = 1 + p / 100;
  for (let i = 1; i < len; i++) {
    line[i] = line[i - 1] + firstdelta * Math.pow(r, i);
  }

  //const line = rangef(len, (i) => firstvalue + firstdelta * Math.pow(r, i));
  console.log("line: ", line);

  let scenarioline = before.concat(line);
  return scenarioline;
}

function checkedcolor(plotcolors, checked, i) {
  let activecolors = plotcolors.filter((c, i) => checked[i]);
  return activecolors[i];
}

export function makeplotdata(data, colors, scenario) {
  const datasets = [];

  let temps = [];
  for (let i = 0; i < data.headings.length; i++) {
    temps.push(rfe(data.gasnames[i], data.rawdata[i]));
  }
  const sumtemp = vecadd(temps);
  let stackedtemps = [temps[0]];
  for (let i = 1; i < temps.length; i++) {
    stackedtemps.push(vecadd([stackedtemps[i - 1], temps[i]]));
  }

  //Line ,konstant
  const konstantdelta = scenarioconstant(sumtemp, scenario);
  datasets.push({
    label: "scenario-konstant",
    data: konstantdelta.slice(data.xlim[0], data.xlim[1]),
    borderColor: "rgba(0,0,0,1.0)",
    pointBackgroundColor: "rgba(255,255,255,0.0)",
    pointHoverBackgroundColor: "rgba(0,0,0,1.0)",
    pointBorderColor: "rgba(255,255,255,0.0)",
    fill: false,
  });

  //Line , exponential
  const exponentialdelta = scenarioexponential(sumtemp, scenario);
  datasets.push({
    label: "scenario-exponential",
    data: exponentialdelta.slice(data.xlim[0], data.xlim[1]),
    borderColor: "rgba(0,255,0,1.0)",
    pointBackgroundColor: "rgba(255,255,255,0.0)",
    pointHoverBackgroundColor: "rgba(0,0,0,1.0)",
    pointBorderColor: "rgba(255,255,255,0.0)",
    fill: false,
  });

  //Line, total
  datasets.push({
    label: "total",
    data: sumtemp.slice(data.xlim[0], data.xlim[1]),
    borderColor: "rgba(255,0,0,1.0)",
    pointBackgroundColor: "rgba(255,255,255,0.0)",
    pointHoverBackgroundColor: "rgba(0,0,0,1.0)",
    pointBorderColor: "rgba(255,255,255,0.0)",
    fill: false,
  });

  //Filled area stuff
  for (let i = 0; i < data.headings.length; i++) {
    let rh = randomhex();
    datasets.push({
      label: data.headings[i],
      data: stackedtemps[i].slice(data.xlim[0], data.xlim[1]),
      borderColor: checkedcolor(colors, data.checked, i) || rh,
      backgroundColor: checkedcolor(colors, data.checked, i) || rh,
      pointBackgroundColor: "rgba(0,0,0, 0.0)",
      pointBorderColor: "rgba(0,0,0, 0.0)",
      fill: i === 0 ? "origin" : "-1", //fill "to x-axis line rather than "previous line" for first
      //fill: false,
    });
  }

  const plotdata = {
    //headings: data.headings, //not needed for plot but maybe for convenience later
    labels: data.year.slice(data.xlim[0], data.xlim[1]),
    datasets: datasets,
  };

  console.log("makeplotdata, plotdata: ", plotdata);

  return plotdata;
}
