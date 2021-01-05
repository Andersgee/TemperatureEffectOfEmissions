const E = (v, x) => v * Math.pow(10, x);

//numbers from from article "Equivalence of greenhouse-gas emissions for peak temperature limits"
const gasdict = {
  CO2: {
    longlived: true,
    k: E(4.32, -13),
  },
  N2O: {
    longlived: true,
    k: E(1330, -13),
  },
  CH4: {
    longlived: false,
    k: E(1.74, -9),
  },
};

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

export default function rfe(gasname, tons) {
  if (!gasdict.hasOwnProperty(gasname)) {
    alert(`the gas ${gasname} is not supported`);
    return [];
  }

  const factor = gasdict[gasname].k;
  if (gasdict[gasname].longlived) {
    return vecmul(cumsum(tons), factor);
  } else {
    return vecmul(tons, factor);
  }
}
