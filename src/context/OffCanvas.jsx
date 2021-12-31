import * as React from "react";

const OffCanvas = React.createContext();

const offCanvasReducer = (offCanvasState, action) => {
  switch (action.type) {
    case "toggle":
      return {
        visible: !offCanvasState.visible,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const OffCanvasProvider = ({ children }) => {
  const [offCanvasState, setOffCanvasState] = React.useReducer(
    offCanvasReducer,
    {
      visible: false,
    }
  );

  const value = { offCanvasState, setOffCanvasState };
  return (
    <OffCanvas.Provider value={value}>{children}</OffCanvas.Provider>
  );
};

//hooks
const useOffCanvas = () => {
  const offCanvas = React.useContext(OffCanvas);
  if (offCanvas === undefined)
    throw new Error("useOffCanvasConfig must be used within a Provider");
  return offCanvas;
};

export { OffCanvasProvider, useOffCanvas };
