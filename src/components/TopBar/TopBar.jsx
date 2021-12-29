import React, { useState } from "react";
import { Link } from "react-router-dom";

// 3d libs
import { MdSettings, MdMenu, MdMenuOpen } from "react-icons/md";

// components
import OffCanvas from "../OffCanvas/OffCanvas";

// styles
import "./style.scss";

const TopBar = (props) => {
  const { texts } = props;
  const [ toggleMenu, setToggleMenu ] = useState(false);

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  }

  return (
    <>
      <div className="top-bar flex justify-right align-center">
        <button onClick={toggleMenuHandler}>
        {toggleMenu ? <MdMenuOpen /> : <MdMenu />}
        </button>
      </div>
      <OffCanvas visible={toggleMenu}>
        <button>
          <MdSettings />
        </button>
      </OffCanvas>
    </>
  );
};

export default TopBar;
