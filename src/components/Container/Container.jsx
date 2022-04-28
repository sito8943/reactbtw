/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
// @emotion/css
import { css } from "@emotion/css";

// prop-types
import PropTypes from "prop-types";

const Container = (props) => {
  const {
    extraProps,
    component,
    children,
    display,
    alignItems,
    justifyContent,
    flexDirection,
    sx,
    id,
    name,
    style,
  } = props;

  const newSx = css({
    flexDirection: flexDirection,
    display,
    alignItems: alignItems,
    justifyContent: justifyContent,
    ...sx,
  });

  return (
    <div
      component={component}
      style={style}
      id={id}
      name={name}
      className={newSx}
      {...extraProps}
    >
      {children}
    </div>
  );
};

Container.defaultProps = {
  component: "div",
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
  flexDirection: "row",
  id: "",
  name: "",
  sx: {},
  style: {},
  extraProps: {},
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.string,
  component: PropTypes.string,
  flexDirection: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  sx: PropTypes.objectOf(PropTypes.any),
  style: PropTypes.objectOf(PropTypes.any),
  extraProps: PropTypes.objectOf(PropTypes.any),
};

export default Container;
