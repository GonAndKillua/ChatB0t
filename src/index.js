import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import LoginContextProvider from "./Store/LoginContextProvider";
ReactDOM.render(
  <React.StrictMode>
    <LoginContextProvider>
      <Router>
        <App />
      </Router>
    </LoginContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
