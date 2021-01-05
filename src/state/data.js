import { connect } from "react-redux";

const initState = null;

export default function data(state = initState, action) {
  return action.type === "data" ? action.payload : state;
}

export const setData = (x) => ({ type: "data", payload: x });

export const withData = (component) =>
  connect(
    (state) => ({ data: state.data }),
    (dispatch) => ({ setData: (x) => dispatch(setData(x)) })
  )(component);
