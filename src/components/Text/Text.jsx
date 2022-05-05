// @emotion/css
import { css } from "@emotion/css";

// prop types
import PropTypes from "prop-types";

const Text = (props) => {
  const { variant, children, sx } = props;

  const variants = {
    h1: {
      margin: 0,
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
      marginBottom: "0.35em",
    },
    h2: {
      margin: 0,
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
      marginBottom: "0.35em",
    },
    h3: {
      margin: 0,
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
      marginBottom: "0.35em",
    },
    h4: {
      margin: 0,
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
      marginBottom: "0.35em",
    },
    h5: {
      margin: 0,
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
      marginBottom: "0.35em",
    },
    body: {
      margin: 0,
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      marginBottom: "0.35em",
    },
  };

  const emotionClass = css({
    ...variants[variant],
    ...sx,
  });

  return <div className={emotionClass}>{children}</div>;
};

Text.defaultProps = {
  variant: "h1",
};

Text.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Text;
