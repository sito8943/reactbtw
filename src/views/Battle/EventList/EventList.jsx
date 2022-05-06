// prop types
import PropTypes from "prop-types";

// own component
import Container from "../../../components/Container/Container";
import Text from "../../../components/Text/Text";

// contexts
import { useBattle } from "../../../context/BattleProvider";
import { useLanguage } from "../../../context/Language";

const EventList = (props) => {
  const { visible } = props;

  const { battleState } = useBattle();
  const { languageState } = useLanguage();

  return (
    <Container
      sx={{
        opacity: visible ? 1 : 0,
        transition: "all 400ms ease",
        zIndex: !visible ? -1 : 10,
        padding: 10,
        background: "#222333",
        position: "fixed",
      }}
    >
      {battleState.notifications &&
        battleState.notifications.map((item, i) => (
          <Container key={`${item.type}${i}`}>
            <Text variant="body" sx={{ color: "#bdbbbb" }}>
              {languageState.texts.Battle.Events.Type[item.label]}
            </Text>
          </Container>
        ))}
    </Container>
  );
};

EventList.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default EventList;
