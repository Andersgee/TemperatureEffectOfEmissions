import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./index";

export function wrapRootElement({ element }) {
  return <Provider store={createStore(rootReducer)}>{element}</Provider>;
}
