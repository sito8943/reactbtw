import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// react-icons
import { EventIcons } from "../../../assets/icons/icons";

// own component
import Container from "../../../components/Container/Container";
import Text from "../../../components/Text/Text";
import Icon from "../../../components/Icon/Icon";

// contexts
import { useBattle } from "../../../context/BattleProvider";
import { useLanguage } from "../../../context/Language";
import { MdInfo } from "react-icons/md";

const EventList = (props) => {
  const { visible } = props;

  const { battleState } = useBattle();
  const { languageState } = useLanguage();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const onClose = (e) => {
    setShow(false);
  };

  const warningBeep = css({
    color: "#f57c00",
    fontSize: "20px",
    marginLeft: "10px",
    marginBottom: "5px",
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
        sx={{
          opacity: show ? 1 : 0,
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
        <Text variant="h5" sx={{ color: "aliceblue" }}>
          {languageState.texts.Battle.Events.Title}
        </Text>
        <Container sx={{ overflow: "auto" }}>
          {battleState.notifications &&
            battleState.notifications.map((item, i) => (
              <Container alignItems="center" key={`${item.label}${i}`}>
                <Icon
                  sx={{
                    color: "#bdbbbb",
                    fontSize: "25px",
                    marginRight: "10px",
                  }}
                  component={EventIcons[item.type]}
                />

                <Text variant="body" sx={{ color: "#bdbbbb" }}>
                  {languageState.texts.Battle.Events.Type[item.label]}
                </Text>
                {!item.read && <MdInfo className={`${warningBeep} beep`} />}
              </Container>
            ))}
        </Container>
      </Container>
    </Container>
  );
};

EventList.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default EventList;
