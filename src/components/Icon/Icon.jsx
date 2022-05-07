// prop types
import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

const Icon = (props) => {
  const { sx, component, id } = props;

  const cssSX = css({ ...sx });

  return (
    <span id={id} className={cssSX}>
      {component}
    </span>
  );
};

Icon.defaultProps = {
  id: "",
};

Icon.propTypes = {
  sx: PropTypes.object,
  component: PropTypes.node.isRequired,
  id: PropTypes.string,
};

export default Icon;
