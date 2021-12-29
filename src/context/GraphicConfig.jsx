import { base64encode } from "nodejs-base64";
import * as React from "react";
import User from "../models/User";

const GraphicConfig = React.createContext();

const graphicConfigReducer = (graphicConfigState, action) => {
  switch (action.type) {
    case "change":
      return {
        animations: action.animations,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const GraphicConfigProvider = ({ children }) => {
  const [graphicConfigState, setGraphicConfigState] = React.useReducer(
    graphicConfigReducer,
    {
      animations: true,
    }
  );

  const value = { graphicConfigState, setGraphicConfigState };
  return (
    <GraphicConfig.Provider value={value}>{children}</GraphicConfig.Provider>
  );
};

//hooks
const useGraphicConfig = () => {
  const graphicConfig = React.useContext(GraphicConfig);
  if (graphicConfig === undefined)
    throw new Error("useGraphicConfig must be used within a Provider");
  return graphicConfig;
};

export { GraphicConfigProvider, useGraphicConfig };
