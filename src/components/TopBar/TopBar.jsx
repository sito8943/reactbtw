import React, { useState } from "react";
import { Link } from "react-router-dom";

// 3d libs
import { MdSettings, MdMenu, MdMenuOpen } from "react-icons/md";

// contexts
import { useOffCanvas } from "../../context/OffCanvas";

// components
import OffCanvas from "../OffCanvas/OffCanvas";
import CharacterPortrait from "../CharacterPortrait/CharacterPortrait";

// styles
import "./style.scss";

const TopBar = (props) => {
  const { texts } = props;
  const { offCanvasState, setOffCanvasState } = useOffCanvas();

  const toggleMenuHandler = () => {
    setOffCanvasState({ type: "toggle"})
  }

  return (
    <>
      <div className="top-bar flex justify-right align-center">
        <button onClick={toggleMenuHandler}>
        {offCanvasState.visible ? <MdMenuOpen /> : <MdMenu />}
        </button>
      </div>
      <OffCanvas id="off-canvas" onClick={toggleMenuHandler} visible={offCanvasState.visible}>
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
