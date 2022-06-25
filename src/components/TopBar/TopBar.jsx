// react-icons
import { MdSettings, MdMenu, MdMenuOpen } from "react-icons/md";

// contexts
import { useOffCanvas } from "../../context/OffCanvas";
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";
import { useLanguage } from "../../context/Language";

// components
import OffCanvas from "../OffCanvas/OffCanvas";
import CharacterPortrait from "../CharacterPortrait/CharacterPortrait";
import SitoContainer from "sito-container";

const TopBar = () => {
  const { offCanvasState, setOffCanvasState } = useOffCanvas();
  const { audioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();
  const { languageState } = useLanguage();

  const topBar = {
    position: "absolute",
    height: "30px",
    width: "100vw",
    top: 0,
    backgroundColor: "#222333",
    backgroundImage:
      "linear-gradient(180deg, rgba(34, 35, 51, 1), rgba(0,0,0,0))",
    zIndex: 1,
  };

  const button = {
    background: "none",
    border: "none",
    width: "30px",
    margin: "6px 0px 1px 0px",
    color: "#aeb4b9",
    fontSize: "20px",
    "&:hover": {
      boxShadow: "0px 0px 10px 2px #22244e",
    },
  };

  const toggleMenuHandler = () => {
    if (offCanvasState.visible) setOffCanvasState({ type: "hidden" });
    else setOffCanvasState({ type: "visible" });
    if (audioConfigState.sfx) setAudioControllerState({ type: "play-pop-up" });
  };

  const closeOffCanvas = () => {
    if (offCanvasState.visible) setOffCanvasState({ type: "hidden" });
    if (audioConfigState.sfx) setAudioControllerState({ type: "play-pop-up" });
  };

  return (
    <>
      <SitoContainer alignItems="center" justifyContent="right" className={topBar}>
        <button className={button} onClick={toggleMenuHandler}>
          {offCanvasState.visible ? <MdMenuOpen /> : <MdMenu />}
        </button>
      </SitoContainer>
      <OffCanvas
        id="off-canvas"
        onClick={closeOffCanvas}
        visible={offCanvasState.visible}
      >
        <CharacterPortrait />
        <div className="row">
          <button className="ghost">
            <MdSettings />
            {languageState.texts.TopBar.Labels.Settings}
          </button>
        </div>
      </OffCanvas>
    </>
  );
};

export default TopBar;
