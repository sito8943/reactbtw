/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React from "react";

// prop-types
import PropTypes from "prop-types";

// @mui components
import { Box } from "@mui/material";

const Container = (props) => {
  const {
    extraProps,
    component,
    children,
    display,
    align,
    justify,
    direction,
    className,
    id,
    name,
    style,
  } = props;

  const sx = {
    flexDirection: direction,
    display,
    alignItems: align,
    justifyContent: justify,
    ...className,
  };

  return (
    <Box
      component={component}
      style={style}
      id={id}
      name={name}
      sx={sx}
      {...extraProps}
    >
      {children}
    </Box>
  );
};

Container.defaultProps = {
  component: "div",
  display: "flex",
  align: "left",
  justify: "left",
  direction: "row",
  className: "",
  id: "",
  name: "",
  style: {},
  extraProps: {},
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.string,
  component: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  className: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  extraProps: PropTypes.objectOf(PropTypes.any),
};

export default Container;
