import * as React from "react";

const AudioController = React.createContext();

const audioControllerReducer = (audioControllerState, action) => {
  console.log("context");
  switch (action.type) {
    case "play-space":
      return {
        space: true,
        popUp: audioControllerState.popUp,
        bigClick: audioControllerState.bigClick,
      }
    case "play-big-click":
      return {
        space: audioControllerState.space,
        popUp: audioControllerState.popUp,
        bigClick: true,
      }
    case "play-pop-up":
      return {
        space: audioControllerState.space,
        popUp: true,
        bigClick: audioControllerState.bigClick,
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
