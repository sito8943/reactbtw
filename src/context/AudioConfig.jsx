import * as React from "react";

const AudioConfig = React.createContext();

const audioConfigReducer = (audioConfigState, action) => {
  switch (action.type) {
    case "toggle-audio":
      return {
        bfx: action.bfx,
        sfx: action.sfx,
        bfxVolumen: audioConfigState.bfxVolumen,
        sfxVolumen: audioConfigState.sfxVolumen,
      };
    case "change-volumen": {
      return {
        bfx: audioConfigState.bfx,
        sfx: audioConfigState.sfx,
        bfxVolumen: action.bfxVolumen,
        sfxVolumen: action.sfxVolumen,
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AudioConfigProvider = ({ children }) => {
  const [audioConfigState, setAudioConfigState] = React.useReducer(
    graphicConfigReducer,
    {
      bfx: true,
      sfx: true,
      bfxVolumen: 100,
      sfxVolumen: 100,
    }
  );

  const value = { audioConfigState, setAudioConfigState };
  return (
    <AudioConfig.Provider value={value}>{children}</AudioConfig.Provider>
  );
};

//hooks
const useAudioConfig = () => {
  const audioConfig = React.useContext(AudioConfig);
  if (audioConfig === undefined)
    throw new Error("useAudioConfig must be used within a Provider");
  return audioConfig;
};

export { AudioConfigProvider, useAudioConfig };
