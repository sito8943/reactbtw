import React, { useState } from "react";
import { Link } from "react-router-dom";

// 3d libs
import { MdSettings, MdMenu, MdMenuOpen } from "react-icons/md";

// contexts
import { useOffCanvas } from "../../context/OffCanvas";
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";

// components
import OffCanvas from "../OffCanvas/OffCanvas";
import CharacterPortrait from "../CharacterPortrait/CharacterPortrait";

// styles
import "./style.scss";

const TopBar = (props) => {
  const { texts } = props;
  const { offCanvasState, setOffCanvasState } = useOffCanvas();
  const { audioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();

  const toggleMenuHandler = () => {
    if (offCanvasState.visible)
      setOffCanvasState({ type: "hidden"});
    else
      setOffCanvasState({ type: "visible"});
    if (audioConfigState.sfx) setAudioControllerState({ type: "play-pop-up"});
  }

  const closeOffCanvas = () => {
    if (offCanvasState.visible)
      setOffCanvasState({ type: "hidden"});
    if (audioConfigState.sfx) setAudioControllerState({ type: "play-pop-up"}); 
  }

  return (
    <>
      <div className="top-bar flex justify-right align-center">
        <button onClick={toggleMenuHandler}>
        {offCanvasState.visible ? <MdMenuOpen /> : <MdMenu />}
        </button>
      </div>
      <OffCanvas id="off-canvas" onClick={closeOffCanvas} visible={offCanvasState.visible}>
        <CharacterPortrait />
        <div className="row">
          <button className="ghost">
            <MdSettings />
            {texts.Labels.Settings}
          </button>
        </div>
      </OffCanvas>
    </>
  );
};

export default TopBar;
