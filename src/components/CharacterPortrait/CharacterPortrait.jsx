// @emotion/css
import { css } from "@emotion/css";

// prop-types
import PropTypes from "prop-types";

// contexts
import { useContext } from "../../context/ContextProvider";
import { useLanguage } from "../../context/Language";

// images
import femaleHighElf from "../../img/portrait/femalehighelf.webp";

// own components
import Container from "../Container/Container";

// styles
import "./style.scss";

const CharacterPortrait = (props) => {
  const { languageState } = useLanguage();

  const { id, name, style } = props;
  const { contextState } = useContext();

  const characterPortrait = css({
    width: "100%",
    padding: "10px",
    h3: {
      color: "#aeb4b9",
    },
    span: {
      color: "#5e6264",
    },
  });

  const imageContainer = css({
    borderRadius: "100%",
    backgroundColor: "#22244e",
    marginRight: "10px",
    img: {
      width: "70px",
    },
  });

  return (
    <Container
      alignItems="center"
      className={characterPortrait}
      id={id}
      name={name}
      style={style}
    >
      <div className={imageContainer}>
        <img
          src={contextState.photo ? contextState.user.photo : femaleHighElf}
          alt="character-portrait"
        />
      </div>
      <div>
        <h3>{contextState.name}</h3>
        <span>{`${
          languageState.texts.CharacterPortrait.Level[contextState.level]
        }`}</span>
      </div>
    </Container>
  );
};

CharacterPortrait.defaultName = "CharacterPortrait";

CharacterPortrait.defaultProps = {
  className: "",
  id: "",
  name: "",
  style: {},
};

CharacterPortrait.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element.isRequired(),
};

export default CharacterPortrait;
