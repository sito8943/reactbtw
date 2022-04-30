import * as React from "react";

const AudioController = React.createContext();

const audioControllerReducer = (audioControllerState, action) => {
  switch (action.type) {
    case "creation": {
      let newCreation = 1;
      if (audioControllerState.creation === 1) newCreation = 2;
      return {
        ...audioControllerState,
        creation: newCreation,
      };
    }
    case "space": {
      let newSpace = 1;
      if (audioControllerState.space === 1) newSpace = 2;
      return {
        ...audioControllerState,
        space: newSpace,
      };
    }
    case "big-click":
      let newBigClick = 1;
      if (audioControllerState.bigClick === 1) newBigClick = 2;
      return {
        ...audioControllerState,
        bigClick: newBigClick,
      };
    case "normal-click":
      let newNormalClick = 1;
      if (audioControllerState.normalClick === 1) newNormalClick = 2;
      return {
        ...audioControllerState,
        normalClick: newNormalClick,
      };
    case "pop-up": {
      let newPopUp = 1;
      if (audioControllerState.popUp === 1) newPopUp = 2;
      return {
        ...audioControllerState,
        popUp: newPopUp,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AudioControllerProvider = ({ children }) => {
  const [audioControllerState, setAudioControllerState] = React.useReducer(
    audioControllerReducer,
    {
      space: 0,
      popUp: 0,
      bigClick: 0,
      normalClick: 0,
      creation: 0,
    }
  );

  const value = { audioControllerState, setAudioControllerState };
  return (
    <AudioController.Provider value={value}>
      {children}
    </AudioController.Provider>
  );
};

//hooks
const useAudioController = () => {
  const audioController = React.useContext(AudioController);
  if (audioController === undefined)
    throw new Error("useAudioController must be used within a Provider");
  return audioController;
};

export { AudioControllerProvider, useAudioController };
