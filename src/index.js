import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// context
import { ContextProvider } from "./context/ContextProvider";

// styles
import "./index.scss";
import "./components/Kenburns/kenburns.scss";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
