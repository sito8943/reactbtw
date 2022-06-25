import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// react-icons
import { EventIcons } from "../../../assets/icons/icons";
import { MdInfo } from "react-icons/md";

// own component
import SitoContainer from "sito-container";
import Text from "../../../components/Text/Text";
import Icon from "../../../components/Icon/Icon";

// contexts
import { useBattle } from "../../../context/BattleProvider";
import { useLanguage } from "../../../context/Language";
import useOnclickOutside from "react-cool-onclickoutside";

const EventList = (props) => {
  const { visible } = props;

  const { battleState } = useBattle();
  const { languageState } = useLanguage();
  const ref = useOnclickOutside(() => {
    if (show) onClose();
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(visible);
    if (visible)
      document.body.onkeydown = (e) => {
        if (e.key === "Escape") onClose();
      };
  }, [visible]);

  const onClose = () => {
    const newNotifications = battleState.notifications;
    for (let i = 0; i < newNotifications.length; i += 1)
      newNotifications[i].read = true;
    setShow(false);
  };

  const warningBeep = css({
    color: "#f57c00",
    fontSize: "20px",
    marginLeft: "10px",
    marginBottom: "5px",
  });

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
          width: 250,
          height: 400,
          alignItems: "start",
          border: "1px solid gray",
          borderRadius: "15px",
        }}
        flexDirection="column"
      >
        <Text className="no-selection" variant="h5" sx={{ color: "aliceblue" }}>
          {languageState.texts.Battle.Events.Title}
        </Text>
        <SitoContainer sx={{ overflow: "auto" }}>
          {battleState.notifications &&
            battleState.notifications.map((item, i) => (
              <SitoContainer alignItems="center" key={`${item.label}${i}`}>
                <Icon
                  sx={{
                    color: "#bdbbbb",
                    fontSize: "25px",
                    marginRight: "10px",
                  }}
                  component={EventIcons[item.type]}
                />

                <Text
                  className="no-selection"
                  variant="body"
                  sx={{ color: "#bdbbbb" }}
                >
                  {languageState.texts.Battle.Events.Type[item.label]}
                </Text>
                {!item.read && <MdInfo className={`${warningBeep} beep`} />}
              </SitoContainer>
            ))}
        </SitoContainer>
      </SitoContainer>
    </SitoContainer>
  );
};

EventList.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default EventList;
