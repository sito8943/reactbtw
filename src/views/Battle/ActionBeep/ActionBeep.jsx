// prop types
import PropTypes from "prop-types";

// own components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../../context/Language";

import { AllActions } from "../../../models/Action";

const ActionBeep = (props) => {
  const { visible, action } = props;

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
      {action && (
        <SitoContainer
          sx={{
            background: "#303030",
            borderRadius: 15,
            color: "aliceblue",
            padding: "10px 20px",
            animation: "action 2s infinite",
          }}
        >
          {languageState.texts.Battle.Actions.Doing[AllActions[action].target]}
        </SitoContainer>
      )}
    </SitoContainer>
  );
};

ActionBeep.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default ActionBeep;
