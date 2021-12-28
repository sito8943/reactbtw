import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// context
import { ContextProvider } from "./context/ContextProvider";
import { GraphicConfigProvider } from "./context/GraphicConfig";

// styles
import "./index.scss";
import "./components/Kenburns/kenburns.scss";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <GraphicConfigProvider>
        <App />
      </GraphicConfigProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
