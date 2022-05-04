import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// own components
import Container from "../Container/Container";
import Text from "../Text/Text";

// images
import character1 from "../../assets/images/characters/character1.jpeg";

const SpeakDialog = (props) => {
  const { portrait, name, text, visible, time } = props;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      if (time) 
    }
  }, [visible]);

  return (
    <Container
      sx={{
        transition: "all 400ms ease",
        transform: show ? "scale(1)" : "scale(0)",
      }}
    >
      <Container sx={{ transition: "all 400ms ease", opacity: show ? 1 : 0 }}>
        <Container>
          <img src={portrait || character1} alt="unit-portrait" />
        </Container>
        <Container>
          <Text>{name}</Text>
          <Text>{text}</Text>
        </Container>
      </Container>
    </Container>
  );
};

SpeakDialog.defaultProps = {
  portrait: "",
  name: "Lorem ipsum",
  text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, iusto aspernatur. Pariatur quae quia necessitatibus aperiam, quisquam esse nisi. Impedit magnam dicta odio iste aut! Totam rerum incidunt excepturi distinctio?",
};

SpeakDialog.propTypes = {
  portrait: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  time: PropTypes.number
};

export default SpeakDialog;
