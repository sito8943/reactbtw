import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// own components
import SitoContainer from "sito-container";
import Text from "../Text/Text";

// images
import character1 from "../../assets/images/characters/character1.jpeg";
import { css } from "@emotion/css";

const SpeakDialog = (props) => {
  const { portrait, name, text, visible, time } = props;

  const [show, setShow] = useState(false);

  const portraitCss = css({
    width: "120px",
    height: "120px",
    borderRadius: "15px",
    marginRight: "10px",
  });

  useEffect(() => {
    if (visible) {
      setShow(true);
      if (time)
        setTimeout(() => {
          setShow(false);
        }, time);
    }
  }, [visible]);

  return (
    <SitoContainer
      sx={{
        transition: "all 400ms ease",
        left: "calc(100vw - 80vw)",
        width: "55%",
        height: "120px",
        borderRadius: "15px",
        position: "fixed",
        bottom: "10px",
        zIndex: 99,
        background: "#383838",
        padding: "10px",
        opacity: show ? 1 : 0,
      }}
      justifyContent="left"
    >
      <SitoContainer>
        <img
          className={portraitCss}
          src={portrait || character1}
          alt="unit-portrait"
        />
      </SitoContainer>
      <SitoContainer flexDirection="column" alignItems="left">
        <Text sx={{ color: "aliceblue" }} variant="h5">
          {name}
        </Text>
        <Text sx={{ color: "aliceblue", overflow: "auto" }} variant="body">
          {text}
        </Text>
      </SitoContainer>
    </SitoContainer>
  );
};

SpeakDialog.defaultProps = {
  portrait: "",
  name: "Lorem ipsum",
  text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, iusto aspernatur. Pariatur quae quia necessitatibus aperiam, quisquam esse nisi. Impedit magnam dicta odio iste aut! Totam rerum incidunt excepturi distinctio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, iusto aspernatur. Pariatur quae quia necessitatibus aperiam, quisquam esse nisi. Impedit magnam dicta odio iste aut! Totam rerum incidunt excepturi distinctio?, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, iusto aspernatur. Pariatur quae quia necessitatibus aperiam, quisquam esse nisi. Impedit magnam dicta odio iste aut! Totam rerum incidunt excepturi distinctio?",
};

SpeakDialog.propTypes = {
  portrait: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  time: PropTypes.number,
};

export default SpeakDialog;
