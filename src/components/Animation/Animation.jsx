// prop types
import PropTypes from "prop-types";

// own components
import SitoContainer from "sito-container";

// animations
import "../../assets/animations/Beep/beep.css";
import "../../assets/animations/Shake/shake.css";
import "../../assets/animations/Hit/hit.css";
import "../../assets/animations/UnitReady/unitready.css";
import Slash from "../../assets/animations/Attack/Slash";

const Animation = (props) => {
  const { target, which } = props;
  return (
    <SitoContainer sx={{ zIndex: 99 }}>
      <Slash x={target.x} y={target.y} />
    </SitoContainer>
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
