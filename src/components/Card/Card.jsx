import React from "react";

// prop-types
import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// framer-motion
import { motion } from "framer-motion";

// utils
import { getInitial, getAnimation, getTransition } from "../../utils/animation";

const Card = (props) => {
  const { children, className, id, name, style, animation } = props;

  const card = {
    width: "350px",
    height: "250px",
    background: "#222333",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: "40px",
    borderRadius: "40px",
    margin: "auto",

    button: {
      margin: "0 10px 0 0",
      border: "2px solid #22244e",
      borderRadius: "40px",
      padding: "10px 25px",
      color: "#aeb4b9",
      textTransform: "uppercase",
      textAlign: "center",
      textDecoration: "none",
    },
  };

  const welcomeCard = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  };

  return (
    <motion.div
      initial={getInitial(animation)}
      animate={getAnimation(animation)}
      transition={getTransition(animation)}
      className={card}
      style={style}
      id={id}
      name={name}
    >
      {children}
    </motion.div>
  );
};

Card.defaultName = "Card";

Card.defaultProps = {
  animation: "",
  id: "",
  name: "",
  className: {},
  style: {},
};

Card.propTypes = {
  className: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element.isRequired(),
};

export default Card;
