import React from "react";

// prop types
import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// own components
import Container from "../../Container/Container";

// icons
import { ClassIcons } from "../../../assets/icons/icons";

// images
import femaleHighElf from "../../../img/portrait/femalehighelf.webp";

const CombatPortrait = (props) => {
  const { character } = props;

  const characterPortrait = {
    padding: "10px",
    background: "#222222",
    border: "1px solid #383838",
    borderRadius: "1rem",
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
    transition: "all 400ms ease",
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
    width: "130px",
    zIndex: 1,
    transition: "all 1000ms ease",
  });

  const characterClass = css({
    fontSize: "12rem",
    position: "absolute",
    opacity: 0.1,
  });

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      sx={characterPortrait}
    >
      <span className={characterClass}>{ClassIcons[character.Class]}</span>
      <Container>
        <img
          src={character ? character.Photo : femaleHighElf}
          className={imageContainer}
          alt="character-portrait"
        />
      </Container>
    </Container>
  );
};

CombatPortrait.defaultProps = {
  character: {},
};

CombatPortrait.propTypes = {
  character: PropTypes.object,
};

export default CombatPortrait;
