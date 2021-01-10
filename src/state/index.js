import { combineReducers } from "redux";
import { connect } from "react-redux";
import plotcolors, { setPlotcolors } from "./plotcolors";
import data, { setData } from "./data";
import parseddata, { setParseddata } from "./parseddata";
import scenario, { setScenario } from "./scenario";

const rr = combineReducers({ plotcolors, data, parseddata, scenario });
export default rr;

const setState = (dispatch, x) => {
  x.hasOwnProperty("plotcolors") && dispatch(setPlotcolors(x.plotcolors));
  x.hasOwnProperty("data") && dispatch(setData(x.data));
  x.hasOwnProperty("parseddata") && dispatch(setParseddata(x.parseddata));
  x.hasOwnProperty("scenario") && dispatch(setScenario(x.scenario));
};

//add the props state and setState to the component
//use the individual withUser or withData if only one is needed...
export const withState = (component) =>
  connect(
    (state) => ({ state: state }),
    (dispatch) => ({ setState: (x) => setState(dispatch, x) })
  )(component);
