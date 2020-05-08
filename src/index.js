import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const createElement = document.getElementById("root");

let render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    createElement
  );
};

if (module.hot) {
  module.hot.accept("./App.js", () => {
    setTimeout(render);
  });
}
render();
