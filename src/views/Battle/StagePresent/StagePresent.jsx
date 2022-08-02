import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../../context/Language";

// styles
import "./stage.css";

const StagePresent = (props) => {
  const { stage, hide } = props;
  const { languageState } = useLanguage();

  const [toHide, setToHide] = useState(false);

  useEffect(() => {
    if (hide)
      setTimeout(() => {
        setToHide(true);
      }, 1000);
    setToHide(false);
  }, [hide]);

  return (
    <SitoContainer
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: toHide ? -1 : 3,
        top: 0,
        left: 0,
      }}
    >
      <h1 className={stage === 0 || stage === 2 ? "combat" : "stage"}>
        {languageState.texts.Battle.Stages[stage]}
      </h1>
    </SitoContainer>
  );
};

StagePresent.propTypes = {
  stage: PropTypes.string.isRequired,
};

export default StagePresent;
