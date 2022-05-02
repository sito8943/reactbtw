// prop types
import PropTypes from "prop-types";

// own components
import Container from "../Container/Container";

// animations
import "../../assets/animations/Hit/shake.css";
import Slash from "../../assets/animations/Attack/Slash";

const Animation = (props) => {
  const { target, which } = props;
  return (
    <Container sx={{ zIndex: 99 }}>
      <Slash x={target.x} y={target.y} />
    </Container>
  );
};

Animation.defaultProps = {
  target: {},
  which: "",
};

Animation.propTypes = {
  target: PropTypes.object,
  which: PropTypes.string,
};

export default Animation;
