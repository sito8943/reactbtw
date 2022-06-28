// prop types
import PropTypes from "prop-types";

// own components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../../context/Language";

import { AllActions } from "../../../models/Action";

const ActionBeep = (props) => {
  const { visible, action, errorCode } = props;

  const { languageState } = useLanguage();

  return (
    <SitoContainer
      sx={{
        position: "fixed",
        bottom: 20,
        zIndex: 40,
        width: "100%",
        justifyContent: "center",
        transition: "all 400ms ease",
        transform: visible ? "scale(1)" : "scale(0)",
      }}
    >
      {action && errorCode === "" && (
        <SitoContainer
          sx={{
            background: "dodgerblue",
            borderRadius: 15,
            color: "aliceblue",
            padding: "10px 20px",
            animation: "action 2s infinite",
          }}
        >
          {languageState.texts.Battle.Actions.Doing[AllActions[action].target]}
        </SitoContainer>
      )}
      {errorCode !== "" && (
        <SitoContainer
          sx={{
            background: "#9f0a26",
            borderRadius: 15,
            color: "aliceblue",
            padding: "10px 20px",
          }}
          className="horizontal-shake"
        >
          {languageState.texts.Battle.Errors[errorCode]}
        </SitoContainer>
      )}
    </SitoContainer>
  );
};

ActionBeep.propTypes = {
  visible: PropTypes.bool.isRequired,
  action: PropTypes.string,
  errorCode: PropTypes.string,
};

export default ActionBeep;
