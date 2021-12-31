import * as React from "react";

const GraphicConfig = React.createContext();

const graphicConfigReducer = (graphicConfigState, action) => {
  switch (action.type) {
    case "set":
      return {
        animations: action.data.animations
      }
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
      animations: false,
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
