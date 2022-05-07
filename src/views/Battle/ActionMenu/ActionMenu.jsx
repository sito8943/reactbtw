import { useEffect, useState } from "react";

// @emotion/css
import { css } from "@emotion/css";

// prop types
import PropTypes from "prop-types";

// icons
import { BasicIcons, AttributeIcons } from "../../../assets/icons/icons";

// own components
import Container from "../../../components/Container/Container";
import Text from "../../../components/Text/Text";
import Icon from "../../../components/Icon/Icon";

// contexts
import { useBattle } from "../../../context/BattleProvider";
import { useLanguage } from "../../../context/Language";
import useOnclickOutside from "react-cool-onclickoutside";

const ActionMenu = (props) => {
  const { visible, playing } = props;

  const { battleState } = useBattle();
  const { languageState } = useLanguage();

  useEffect(() => {
    setShow(visible);
    if (visible)
      document.body.onkeydown = (e) => {
        if (e.key === "Escape") onClose();
      };
  }, [visible]);

  const onClose = () => {
    setShow(false);
  };

  const ref = useOnclickOutside(() => {
    if (show) onClose();
  });

  const [show, setShow] = useState(false);

  const actionButtonCss = css({
    width: "100%",
    display: "flex",
    alignItems: "center",
    border: "none",
    background: "no-repeat",
    transition: "all 400ms ease",
  });

  return (
    <Container
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "fixed",
        zIndex: !show ? -1 : 10,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container
        ref={ref}
        sx={{
          transform: show ? "scale(1)" : "scale(0)",
          transition: "all 400ms ease",
          padding: 10,
          background: "#222333",
          width: 350,
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
        <Container
          flexDirection="column"
          sx={{ width: "100%", overflow: "auto" }}
        >
          {playing.Basics.attack && (
            <button className={actionButtonCss}>
              <Icon
                sx={{
                  color: "#bdbbbb",
                  fontSize: "25px",
                  marginRight: "10px",
                }}
                component={AttributeIcons.attack}
              />
              <Text
                className="no-selection"
                variant="body"
                sx={{ color: "#bdbbbb" }}
              >
                {languageState.texts.Battle.Actions.Basics.Attack}
              </Text>
            </button>
          )}
          {playing.Basics.wait && (
            <button className={actionButtonCss}>
              <Icon
                sx={{
                  color: "#bdbbbb",
                  fontSize: "25px",
                  marginRight: "10px",
                }}
                component={BasicIcons.wait}
              />
              <Text
                className="no-selection"
                variant="body"
                sx={{ color: "#bdbbbb" }}
              >
                {languageState.texts.Battle.Actions.Basics.Wait}
              </Text>
            </button>
          )}
          {playing.Basics.run && (
            <button className={actionButtonCss}>
              <Icon
                sx={{
                  color: "#bdbbbb",
                  fontSize: "25px",
                  marginRight: "10px",
                }}
                component={BasicIcons.run}
              />
              <Text
                className="no-selection"
                variant="body"
                sx={{ color: "#bdbbbb" }}
              >
                {languageState.texts.Battle.Actions.Basics.Run}
              </Text>
            </button>
          )}
        </Container>
      </Container>
    </Container>
  );
};

ActionMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  playing: PropTypes.object,
};

export default ActionMenu;
