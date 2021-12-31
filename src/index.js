import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// context
import { ContextProvider } from "./context/ContextProvider";
import { GraphicConfigProvider } from "./context/GraphicConfig";
import { OffCanvasProvider } from "./context/OffCanvas";

// styles
import "./index.scss";
import "./components/Kenburns/kenburns.scss";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <GraphicConfigProvider>
        <OffCanvasProvider>
          <App />
        </OffCanvasProvider>
      </GraphicConfigProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
