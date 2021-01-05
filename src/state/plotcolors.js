import { connect } from "react-redux";

const initState = [
  "#d32f2f",
  "#388e3c",
  "#303f9f",
  "#fbc02d",
  "#c2185b",
  "#689f38",
  "#1976d2",
  "#f57c00",
];

export default function plotcolors(state = initState, action) {
  return action.type === "plotcolors" ? action.payload : state;
}

export const setPlotcolors = (x) => ({ type: "plotcolors", payload: x });

export const withPlotcolors = (component) =>
  connect(
    (state) => ({ plotcolors: state.plotcolors }),
    (dispatch) => ({ setPlotcolors: (x) => dispatch(setPlotcolors(x)) })
  )(component);
