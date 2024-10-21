import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router> 
      <App />
    </Router>
  </Provider>
);

reportWebVitals();
