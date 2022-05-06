// own components
import Container from "../../../components/Container/Container";

// react-icons
import { MdInfo } from "react-icons/md";
import { css } from "@emotion/css";

const EventsNotification = () => {
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

  return (
    <Container
      className="shake"
      sx={{ position: "fixed", top: "10px", left: "10px" }}
    >
      <button className={eventButtonCss}>
        <MdInfo className={eventIconCss} />
      </button>
    </Container>
  );
};

export default EventsNotification;
