import { connect } from "react-redux";

const initState = { startindex: 0, len: 15, p: 0 };

export default function scenario(state = initState, action) {
  return action.type === "scenario" ? action.payload : state;
}

export const setScenario = (x) => ({ type: "scenario", payload: x });

export const withScenario = (component) =>
  connect(
    (state) => ({ data: state.data }),
    (dispatch) => ({ setScenario: (x) => dispatch(setScenario(x)) })
  )(component);
