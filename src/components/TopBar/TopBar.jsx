import React from "react";
import { Link } from "react-router-dom";

import settings from "../../img/compass.svg";

// styles
import "./style.scss";

const TopBar = (props) => {
  const { texts } = props;

  return (
    <div className="top-bar flex justify-space-between align-center">
      <button>
        <img src={settings} alt="settings-gear" />
      </button>
      <button>
        <img src={settings} alt="menu-bars" />
      </button>
    </div>
  );
};

export default TopBar;
