// @emotion/css
import { css } from "@emotion/css";

// prop types
import PropTypes from "prop-types";

const Text = (props) => {
  const { variant, children } = props;

  const variants = {
    h1: css({
      margin: 0,
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
      marginBottom: "0.35em",
    }),
    h2: css({
      margin: 0,
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
      marginBottom: "0.35em",
    }),
    h3: css({
      margin: 0,
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
      marginBottom: "0.35em",
    }),
    h4: css({
      margin: 0,
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
      marginBottom: "0.35em",
    }),
    h5: css({
      margin: 0,
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
      marginBottom: "0.35em",
    }),
    body: css({
      margin: 0,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      marginBottom: "0.35em",
    }),
  };

  return <div className={variants[variant]}>{children}</div>;
};

Text.defaultProps = {
  variant: "h1",
};

Text.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Text;
