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

function rfe(gasname, tons) {
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

const randomhex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const copy = (v) => v.slice(9);

function rangef(n, func) {
  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = func(i);
  }
  return a;
}

export function makeplotdata(data, colors, startyear, percentage) {
  let temps = [];
  for (let i = 0; i < data.headings.length; i++) {
    temps.push(rfe(data.gasnames[i], data.rawdata[i]));
  }

  const sumtemp = vecadd(temps).slice(startyear);
  const labels = data.year.slice(startyear);

  //see here for options: https://www.chartjs.org/docs/latest/charts/line.html
  const datasets = [];

  //baseline
  datasets.push({
    label: "baseline",
    data: sumtemp,
    fill: false,
    borderColor: "rgba(255,0,0,1.0)",
    pointBackgroundColor: "rgba(255,255,255,0.0)",
    pointBorderColor: "rgba(255,255,255,0.0)",
    pointHoverBackgroundColor: "rgba(0,0,0,1.0)",
  });

  //konstant delta
  const N = sumtemp.length;
  const firstvalue = sumtemp[0];
  const firstdelta = sumtemp[1] - sumtemp[0];
  const konstantdelta = rangef(N, (i) => firstvalue + firstdelta * i);
  datasets.push({
    label: "konstant",
    data: konstantdelta,
    fill: false,
    borderColor: "rgba(233,245,66,1.0)",
    pointBackgroundColor: "rgba(255,255,255,0.0)",
    pointBorderColor: "rgba(255,255,255,0.0)",
    pointHoverBackgroundColor: "rgba(0,0,0,1.0)",
  });

  //Exponential delta
  let exponentialdelta = new Array(N);
  exponentialdelta[0] = firstvalue;
  let r = 1 + percentage / 100;
  for (let i = 1; i < N; i++) {
    exponentialdelta[i] = exponentialdelta[i - 1] + firstdelta * Math.pow(r, i);
  }
  datasets.push({
    label: "exponential",
    data: exponentialdelta,
    fill: false,
    borderColor: "rgba(245,158,66,1.0)",
    pointBackgroundColor: "rgba(255,255,255,0.0)",
    pointBorderColor: "rgba(255,255,255,0.0)",
    pointHoverBackgroundColor: "rgba(0,0,0,1.0)",
  });

  const alldata = {
    //headings: data.headings, //not needed for plot but maybe for convenience later
    labels: labels,
    datasets: datasets,
  };

  console.log("makeplotdata, deltatemp, alldata: ", alldata);

  return alldata;
}
