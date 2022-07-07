import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../../context/Language";

// styles
import "./stage.css";

const StagePresent = (props) => {
  const { stage } = props;
  const { languageState } = useLanguage();

  return (
    <SitoContainer
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: 3,
        top: 0,
        left: 0,
      }}
    >
      <h1 className="stage">{languageState.texts.Battle.Stages[stage]}</h1>
    </SitoContainer>
  );
};

StagePresent.propTypes = {
  stage: PropTypes.string.isRequired,
};

export default StagePresent;