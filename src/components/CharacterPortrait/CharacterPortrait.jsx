import { useState } from "react";

// @emotion/css
import { css } from "@emotion/css";

// models
import { ClassIcons } from "../../assets/icons/icons";

// contexts
import { useContext } from "../../context/ContextProvider";
import { useLanguage } from "../../context/Language";

// images
import femaleHighElf from "../../img/portrait/femalehighelf.webp";

// icons
import { MdAddCircle, MdCancel } from "react-icons/md";

// own components
import Container from "../Container/Container";

// styles
import "./style.css";

const CharacterPortrait = (props) => {
  const { languageState } = useLanguage();

  const { id, name, style } = props;
  const { contextState } = useContext();

  const [seeMore, setSeeMore] = useState(false);

  const characterPortrait = {
    padding: "10px",
    borderRight: seeMore ? "1px solid gray" : "none",
    background: "#222222",
    borderRadius: !seeMore ? "1rem" : "1rem 0 0 1rem",
    width: "200px",
    height: "300px",
    zIndex: 1,
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
    transition: "all 400ms ease",
  };

  const imageContainer = css({
    borderRadius: "100%",
    backgroundColor: "#22244e",
    img: {
      width: "130px",
    },
    zIndex: 1,
  });

  const characterClass = css({
    fontSize: "12rem",
    position: "absolute",
    opacity: 0.1,
  });

  const moreButton = css({
    border: 0,
    background: "none",
    color: "aliceblue",
    fontSize: "25px",
    transition: "all 400ms ease",
    "&:hover": {
      color: "gray",
    },
  });

  return (
    <>
      <Container
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        sx={characterPortrait}
        id={id}
        name={name}
        style={style}
        className="rotate-card"
      >
        <Container
          sx={{
            width: "100%",
            zIndex: 2,
            justifyContent: "end",
            marginBottom: "-50px",
            marginTop: "-15px",
          }}
        >
          <button className={moreButton} onClick={() => setSeeMore(!seeMore)}>
            <MdAddCircle style={{ transition: "all 400ms ease" }} />
          </button>
        </Container>
        <span className={characterClass}>{ClassIcons[contextState.class]}</span>
        <div className={imageContainer}>
          <img
            src={contextState.photo ? contextState.user.photo : femaleHighElf}
            alt="character-portrait"
          />
        </div>
        <Container sx={{ zIndex: 1 }} flexDirection="column">
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
      <Container
        sx={{
          opacity: seeMore ? 1 : 0,
          padding: "10px",
          borderRadius: "1rem 1rem 1rem 1rem",
          background: "#222222eb",
          width: seeMore ? "400px" : 0,
          height: "300px",
          transition: "all 400ms ease",
          marginLeft: "-20px",
        }}
      ></Container>
    </>
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
