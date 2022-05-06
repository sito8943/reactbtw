// @emotion/css
import { css } from "@emotion/css";

// own components
import Container from "../../../components/Container/Container";
import Badge from "./Badge/Badge";

// react-icons
import { MdInfo } from "react-icons/md";

// contexts
import { useLanguage } from "../../../context/Language";
import { useBattle } from "../../../context/BattleProvider";
import { useEffect } from "react";

const EventsNotification = () => {
  const { battleState } = useBattle();

  const eventButtonCss = css({
    border: "none",
    background: "aliceblue",
    color: "#f57c00",
    width: 30,
    height: 30,
    fontSize: 30,
    borderRadius: "100%",
    padding: 0,
  });

  const eventIconCss = css({
    margin: -4,
    fontSize: 38,
  });

  useEffect(() => {
    setBattleState({ type: "init", field: Field() });
  }, []);

  return (
    <Container
      className="shake"
      sx={{ position: "fixed", top: "10px", left: "10px" }}
    >
      <Badge count={0} />
      <button className={eventButtonCss}>
        <MdInfo className={eventIconCss} />
      </button>
    </Container>
  );
};

export default EventsNotification;
