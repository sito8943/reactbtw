// prop types
import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

const Icon = (props) => {
  const { sx, component } = props;

  const cssSX = css({ ...sx });

  return <span className={cssSX}>{component}</span>;
};

Icon.propTypes = {
  sx: PropTypes.object,
  component: PropTypes.node.isRequired,
};

export default Icon;
