import XLSX from "xlsx";
import { ghgs } from "./ghgs";
import { warningtext } from "./utils";

function trues(N) {
  return new Array(N).fill(true);
}

function columndata(parsed) {
  const headings = parsed.headings;
  const gasnames = parsed.gasnames;
  const rows = parsed.rows;

  const Ngases = gasnames.length;
  const N = rows.length;

  const year = new Uint32Array(N);
  for (let i = 0; i < N; i++) {
    year[i] = rows[i][0];
  }

  const rawdata = new Array(Ngases).fill(0).map((x) => new Float32Array(N));
  for (let n = 0; n < Ngases; n++) {
    for (let i = 0; i < N; i++) {
      rawdata[n][i] = rows[i][n + 1]; //first column in "rows" is year.
    }
  }

  //these are the supported indexes, use to filter the returned stuff
  const supported = gasnames.map((gasname) => ghgs.hasOwnProperty(gasname));

  //alert a warning text for unsupported gases.
  const hasunsupported = supported.some((x) => x === false);
  if (hasunsupported) {
    let unsupportednames = gasnames.filter((x, i) => !supported[i]);
    alert(warningtext(unsupportednames));
  }

  const xlim = [0, year.length];
  const checked = trues(Ngases);
  const cdata = {
    headings: headings.filter((x, i) => supported[i]),
    gasnames: gasnames.filter((x, i) => supported[i]),
    rawdata: rawdata.filter((x, i) => supported[i]),
    checked: checked.filter((x, i) => supported[i]),
    year,
    xlim,
  };
  return cdata;
}

async function parseExcelFile(file) {
  const data = await file.arrayBuffer().then((buf) => new Uint8Array(buf));
  const workbook = XLSX.read(data, { type: "array" });
  const sheetnames = Object.keys(workbook.Sheets);
  const firstsheet = workbook.Sheets[sheetnames[0]];
  const X = XLSX.utils.sheet_to_json(firstsheet, {
    header: 1,
    defval: 0,
  });
  //X is an array of arrays
  //X[0] is the first row
  //X[1] is the second row etc
  const headings = X[0].slice(1);
  const gasnames = X[1].slice(1);
  const rows = X.slice(3);
  return columndata({ headings, gasnames, rows });
}

export { parseExcelFile };
