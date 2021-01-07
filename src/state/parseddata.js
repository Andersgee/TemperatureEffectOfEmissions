import { connect } from "react-redux";

const initState = null;

export default function parseddata(state = initState, action) {
  return action.type === "parseddata" ? action.payload : state;
}

export const setParseddata = (x) => ({ type: "parseddata", payload: x });

export const withParseddata = (component) =>
  connect(
    (state) => ({ data: state.data }),
    (dispatch) => ({ setParseddata: (x) => dispatch(setParseddata(x)) })
  )(component);
