import usePromise from "react-fetch-hook/usePromise";
import { parseExcelFile } from "../js/parser";

async function getDefaultData() {
  const filename = "Emissions.xlsx";
  const data = await fetch(`/${filename}`).then((res) => parseExcelFile(res));
  data.filename = filename;
  return data;
}

export default function useData() {
  return usePromise(() => getDefaultData());
}
