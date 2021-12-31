import * as React from "react";

const AudioController = React.createContext();

const audioControllerReducer = (audioControllerState, action) => {
  const value = action.who;
  const localAudioControllerState = audioControllerState;
  localAudioControllerState[value] = true;
  switch (action.type) {
    case "play":
      return {
        space: localAudioControllerState.space,
        popUp: localAudioControllerState.popUp,
        bigClick: localAudioControllerState.bigClick,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AudioControllerProvider = ({ children }) => {
  const [audioControllerState, setAudioControllerState] = React.useReducer(
    audioControllerReducer,
    {
      space: false,
      popUp: false,
      bigClick: false,
    }
  );

  const value = { audioControllerState, setAudioControllerState };
  return (
    <AudioController.Provider value={value}>{children}</AudioController.Provider>
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
