// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useContext } from "../../context/ContextProvider";
import { useLanguage } from "../../context/Language";

// images
import femaleHighElf from "../../img/portrait/femalehighelf.webp";

// own components
import Container from "../Container/Container";

const CharacterPortrait = (props) => {
  const { languageState } = useLanguage();

  const { id, name, style } = props;
  const { contextState } = useContext();

  const characterPortrait = {
    padding: "10px",
    background: "#222222",
    borderRadius: "1rem",
    width: "200px",
    height: "300px",
    h3: {
      color: "#aeb4b9",
    },
    span: {
      color: "#5e6264",
    },
    ".label": {
      marginRight: "10px",
      fontWeight: "500",
    },
    ".portrait-row": {
      marginTop: "10px",
    },
  };

  const imageContainer = css({
    borderRadius: "100%",
    backgroundColor: "#22244e",
    img: {
      width: "130px",
    },
  });

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      sx={characterPortrait}
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
      <Container flexDirection="column">
        <Container className="portrait-row" id="name-row">
          <span className="label">
            {`${languageState.texts.CharacterPortrait.Labels.Name}`}{" "}
          </span>
          <span>{`${contextState.name}`}</span>
        </Container>
        <Container className="portrait-row" id="level-row">
          <span className="label">
            {`${languageState.texts.CharacterPortrait.Labels.Level}`}{" "}
          </span>
          <span>{`${contextState.level}`}</span>
        </Container>
        <Container className="portrait-row" id="range-row">
          <span className="label">
            {`${languageState.texts.CharacterPortrait.Labels.Range}`}{" "}
          </span>
          <span>{`${
            languageState.texts.CharacterPortrait.Range[contextState.level]
          }`}</span>
        </Container>
      </Container>
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

/*CharacterPortrait.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element.isRequired(),
};*/

export default CharacterPortrait;
