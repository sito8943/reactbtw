import React from "react";
import PropTypes from "prop-types";

// contexts
import { useContext } from "../../context/ContextProvider";

// utils
import { GetTexts } from "../../lang/texts";

// images
import femalehighelf from "../../img/portrait/femalehighelf.webp";

// styles
import "./style.scss";

const CharactePortrait = (props) => {
  const { className, id, name, style } = props;
  const { contextState } = useContext();

  return (
    <div className={`character-portrait ${className}`} id={id} name={name} style={style} >
      <div className="image-container">
        <img src={contextState.photo ? contextState.user.photo : femalehighelf } alt="character-portrait" />
      </div>
      <div>
        <h3>{contextState.name}</h3>
        <span>{`${GetTexts(contextState.lang, "CharacterPortrait").Level[Number(contextState.level)]}`}</span>
      </div>
    </div>
  );
};

CharactePortrait.defaultName = "CharactePortrait";

CharactePortrait.defaultProps = {
  className: "",
  id: "",
  name: "",
  style: {},
}

/*Card.checkPropTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element.isRequired()
}*/

export default CharactePortrait;
