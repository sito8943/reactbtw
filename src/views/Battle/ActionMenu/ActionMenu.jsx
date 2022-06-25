import { useEffect, useState } from "react";

// @emotion/css
import { css } from "@emotion/css";

// prop types
import PropTypes from "prop-types";

// icons
import { BasicIcons, AttributeIcons } from "../../../assets/icons/icons";

// own components
import SitoContainer from "sito-container";
import Text from "../../../components/Text/Text";
import Icon from "../../../components/Icon/Icon";

// contexts
import { useBattle } from "../../../context/BattleProvider";
import { useLanguage } from "../../../context/Language";
import useOnclickOutside from "react-cool-onclickoutside";

const ActionMenu = (props) => {
  const { visible, playing, action } = props;

  const { battleState } = useBattle();
  const { languageState } = useLanguage();

  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(visible);
    setShow(visible);
  }, [visible]);

  const onClose = () => {
    setShow(false);
  };

  const ref = useOnclickOutside(() => {
    if (show) onClose();
  });

  const actionButtonCss = css({
    width: "100%",
    display: "flex",
    alignItems: "center",
    border: "none",
    background: "no-repeat",
    transition: "all 400ms ease",
    padding: "10px 15px 5px 15px",
    borderRadius: "15px",
    "&:hover": {
      background: "#222",
    },
  });

  const actionIconCss = {
    color: "#bdbbbb",
    fontSize: "25px",
    marginRight: "10px",
  };

  return (
    <SitoContainer
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "fixed",
        zIndex: !show ? -1 : 10,
        width: "100vw",
        height: "100vh",
      }}
    >
      <SitoContainer
        ref={ref}
        sx={{
          transform: show ? "scale(1)" : "scale(0)",
          transition: "all 400ms ease",
          padding: 10,
          background: "#222333",
          width: 300,
          height: 400,
          alignItems: "start",
          border: "1px solid gray",
          borderRadius: "15px",
        }}
        flexDirection="column"
      >
        <Text className="no-selection" variant="h5" sx={{ color: "aliceblue" }}>
          {languageState.texts.Battle.Actions.Title} {playing.Name}?
        </Text>
        <SitoContainer
          flexDirection="column"
          sx={{ width: "100%", overflow: "auto" }}
        >
          {playing.Basics.attack && (
            <button onClick={action} id="battack" className={actionButtonCss}>
              <Icon
                sx={actionIconCss}
                id="iattack"
                component={AttributeIcons.attack}
              />
              <Text
                id="tattack"
                className="no-selection"
                variant="body"
                sx={{ color: "#bdbbbb" }}
              >
                {languageState.texts.Battle.Actions.Basics.Attack}
              </Text>
            </button>
          )}
          {playing.Basics.wait && (
            <button onClick={action} id="bwait" className={actionButtonCss}>
              <Icon sx={actionIconCss} id="iwait" component={BasicIcons.wait} />
              <Text
                id="twait"
                className="no-selection"
                variant="body"
                sx={{ color: "#bdbbbb" }}
              >
                {languageState.texts.Battle.Actions.Basics.Wait}
              </Text>
            </button>
          )}
          {playing.Basics.run && (
            <button onClick={action} id="brun" className={actionButtonCss}>
              <Icon sx={actionIconCss} id="irun" component={BasicIcons.run} />
              <Text
                id="trun"
                className="no-selection"
                variant="body"
                sx={{ color: "#bdbbbb" }}
              >
                {languageState.texts.Battle.Actions.Basics.Run}
              </Text>
            </button>
          )}
        </SitoContainer>
      </SitoContainer>
    </SitoContainer>
  );
};

ActionMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  playing: PropTypes.object,
  action: PropTypes.func.isRequired,
};

export default ActionMenu;
