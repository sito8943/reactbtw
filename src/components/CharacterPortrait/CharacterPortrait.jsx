import { useState } from "react";

// @emotion/css
import { css } from "@emotion/css";

// models
import { AttributeIcons, ClassIcons } from "../../assets/icons/icons";

// contexts
import { ContextProvider, useContext } from "../../context/ContextProvider";
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
    color: "#5e6264",
    transition: "all 400ms ease",
  };

  const portraitRow = {
    marginTop: "10px",
    alignItems: "center",
  };

  const spaceAround = {
    justifyContent: "space-around",
  };

  const bigFont = {
    fontSize: "20px",
  };

  const label = css({
    marginRight: "10px",
    fontWeight: "500",
  });

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

  const attributes = {
    opacity: seeMore ? 1 : 0,
    padding: "10px",
    borderRadius: "1rem 1rem 1rem 1rem",
    background: "#222222eb",
    width: seeMore ? "400px" : 0,
    height: "300px",
    transition: "all 400ms ease",
    marginLeft: "-20px",
    paddingLeft: "20px",
    color: "#797e81",
  };

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
            <MdAddCircle
              style={{
                transition: "all 400ms ease",
                transform: seeMore ? "rotateZ(45deg)" : "rotateX(0deg)",
              }}
            />
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
          <Container sx={portraitRow} id="name-row">
            <span className={label}>
              {languageState.texts.CharacterPortrait.Labels.Name}{" "}
            </span>
            <span>{contextState.name}</span>
          </Container>
          <Container sx={portraitRow} id="level-row">
            <span className={label}>
              {languageState.texts.CharacterPortrait.Labels.Level}{" "}
            </span>
            <span>{contextState.level}</span>
          </Container>
          <Container sx={portraitRow} id="range-row">
            <span className={label}>
              {languageState.texts.CharacterPortrait.Labels.Range}{" "}
            </span>
            <span>
              {languageState.texts.CharacterPortrait.Range[contextState.level]}
            </span>
          </Container>
        </Container>
      </Container>
      <Container sx={attributes}>
        <Container
          flexDirection="column"
          sx={{ padding: "0 20px", width: "100%" }}
        >
          <h3>{languageState.texts.CharacterPortrait.Labels.Attributes}</h3>
          <Container>
            <Container flexDirection="column">
              <Container
                sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                id="attack-row"
              >
                <span style={{ marginRight: "20px" }} className={label}>
                  {AttributeIcons.attack}
                </span>
                <Container sx={{ marginBottom: "2px" }}>
                  <span className={label}>
                    {languageState.texts.CharacterPortrait.Labels.Attack}{" "}
                  </span>
                  <span>{contextState.attack}</span>
                </Container>
              </Container>
              <Container
                sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                id="armor-row"
              >
                <span className={label}>{AttributeIcons.armor}</span>
                <Container sx={{ marginBottom: "2px" }}>
                  <span className={label}>
                    {languageState.texts.CharacterPortrait.Labels.Armor}{" "}
                  </span>
                  <span>{contextState.armor}</span>
                </Container>
              </Container>
            </Container>

            <Container flexDirection="column" sx={{ marginLeft: "20px" }}>
              <Container
                sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                id="life-row"
              >
                <span className={label}>{AttributeIcons.life}</span>
                <Container sx={{ marginBottom: "2px" }}>
                  <span className={label}>
                    {languageState.texts.CharacterPortrait.Labels.Life}{" "}
                  </span>
                  <span>
                    {contextState.life.current} / {contextState.life.max}
                  </span>
                </Container>
              </Container>
              <Container
                sx={{ ...portraitRow, ...bigFont, ...spaceAround }}
                id="mana-row"
              >
                <span className={label}>{AttributeIcons.mana}</span>
                <Container sx={{ marginBottom: "2px" }}>
                  <span className={label}>
                    {languageState.texts.CharacterPortrait.Labels.Mana}{" "}
                  </span>
                  <span>
                    {contextState.mana.current} / {contextState.mana.max}
                  </span>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
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
