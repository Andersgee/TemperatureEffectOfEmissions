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

function dataslice(data, a, b) {
  return {
    ...data,
    year: data.year.slice(a, b),
    rawdata: data.rawdata.map((r) => r.slice(a, b)),
  };
}

export function makeplotdata(data, colors) {
  //const data = dataslice(mdata, mdata.xlim[0], mdata.xlim[1]);

  console.log("makeplotdata, data: ", data);
  const datasets = [];
  for (let i = 0; i < data.headings.length; i++) {
    let rh = randomhex();
    datasets.push({
      label: data.headings[i],
      //data: rfe(data.gasnames[i], data.rawdata[i]),
      data: rfe(data.gasnames[i], data.rawdata[i]).slice(
        data.xlim[0],
        data.xlim[1]
      ),
      borderColor: colors[i] || rh,
      backgroundColor: colors[i] || rh,
      pointBackgroundColor: "rgba(0,0,0, 0.0)",
      pointBorderColor: "rgba(0,0,0, 0.0)",
      fill: "-1",
    });
  }
  datasets[0].fill = "origin"; //special first

  const plotdata = {
    //headings: data.headings, //not needed for plot but maybe for convenience later
    labels: data.year.slice(data.xlim[0], data.xlim[1]),
    datasets: datasets,
  };

  console.log("makeplotdata, plotdata: ", plotdata);

  return plotdata;
}
