import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import Reducer from "./_reducers";

const createStoreWithMiddelware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddelware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
