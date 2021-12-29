import React from "react";
import { Link } from "react-router-dom";

// 3d libs
import { MdSettings, MdMenu, MdMenuOpen } from "react-icons/md";


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
      <div className="top-bar flex justify-left align-center">
        <button>
          <MdSettings />
        </button>
        <button onClick={toggleMenuHandler}>
        {toggleMenu ? <MdMenu /> : <MdMenuOpen />}
        </button>
      </div>
      <div>
      </div>
    </>
  );
};

export default TopBar;
