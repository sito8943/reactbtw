// prop types
import PropTypes from "prop-types";

//  sito components
import SitoContainer from "sito-container";
import SitoImage from "sito-image";

// @emotion/css
import { css } from "@emotion/css";

// own components
import Text from "../../Text/Text";

// context
import { useLanguage } from "../../../context/Language";

// icons
import { ClassIcons } from "../../../assets/icons/icons";

// images
import femaleHighElf from "../../../img/portrait/femalehighelf.webp";
import CardBackground from "../../../assets/images/card-bg/CardBackground";

const CombatPortrait = (props) => {
  const { languageState } = useLanguage();
  const { character, id, className } = props;

  const combatPortrait = {
    position: "relative",
    padding: "10px",
    marginRight: "15px",
    border: "1px solid #383838",
    borderRadius: "1rem",
    width: "200px",
    height: "250px",
    zIndex: 1,
    h3: {
      color: "#aeb4b9",
    },
    color: "#5e6264",
    transition: "all 500ms ease",
  };

  const portraitRow = {
    zIndex: 3,
    alignItems: "center",
    transition: "all 400ms ease",
  };

  const label = {
    zIndex: 3,
    marginRight: "10px",
    fontWeight: "500",
  };

  const imageContainer = css({
    borderRadius: "100%",
    backgroundColor: "#22244e",
    width: "130px",
    zIndex: 3,
    transition: "all 1000ms ease",
  });

  const characterClass = {
    zIndex: 2,
    fontSize: "12rem",
    position: "absolute",
    opacity: 0.2,
  };

  return (
    <SitoContainer
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={combatPortrait}
      id={id}
      className={className}
    >
      <SitoImage
        src={CardBackground.forest1}
        sx={{
          position: "absolute",
          width: "96%",
          height: "97%",
          top: 0,
          left: 0,
          borderRadius: "1rem",
          objectFit: "cover",
          objectPosition: "center",
          filter: "brightness(0.5)",
          margin: "2%",
        }}
      />
      <Text variant="span" className="no-selection" sx={characterClass}>
        {ClassIcons[character.Class]}
      </Text>
      <SitoContainer>
        <img
          src={character.Photo ? character.Photo : femaleHighElf}
          className={`${imageContainer} no-selection`}
          alt="character-portrait"
        />
      </SitoContainer>
      <SitoContainer
        flexDirection="column"
        alignItems="center"
        sx={{
          marginTop: "20px",
          padding: "10px 0",
          background: "#2222228f",
          width: "100%",
          zIndex: 2,
          borderRadius: "1rem",
        }}
      >
        <SitoContainer sx={portraitRow} id="name-row">
          <Text variant="span" sx={label} className="no-selection">
            {languageState.texts.CharacterPortrait.Labels.Name}{" "}
          </Text>
          <Text variant="span" className="no-selection">
            {character.Name}
          </Text>
        </SitoContainer>
        <SitoContainer sx={portraitRow} id="level-row">
          <Text variant="span" sx={label} className="no-selection">
            {languageState.texts.CharacterPortrait.Labels.Level}{" "}
          </Text>
          <Text variant="span" className="no-selection">
            {character.Level}
          </Text>
        </SitoContainer>
      </SitoContainer>
    </SitoContainer>
  );
};

CombatPortrait.defaultProps = {
  character: {},
  id: "",
  className: "",
};

CombatPortrait.propTypes = {
  character: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default CombatPortrait;
