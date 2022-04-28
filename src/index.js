import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// context
import { ContextProvider } from "./context/ContextProvider";
import { GraphicConfigProvider } from "./context/GraphicConfig";
import { AudioConfigProvider } from "./context/AudioConfig";
import { OffCanvasProvider } from "./context/OffCanvas";
import { AudioControllerProvider } from "./context/AudioController";

// styles
import "./index.scss";
import "./components/Kenburns/kenburns.scss";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      ``<GraphicConfigProvider>
        <AudioConfigProvider>
          <OffCanvasProvider>
            <AudioControllerProvider>
              <App />
            </AudioControllerProvider>
          </OffCanvasProvider>
        </AudioConfigProvider>
      </GraphicConfigProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
