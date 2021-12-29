import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// utils
import { getInitial, getAnimation, getTransition } from "../../utils/animation";

// styles
import "./style.scss";

const Card = (props) => {
  const { children, className, id, name, style, animation } = props;

  return (
    <motion.div initial={getInitial(animation)} animate={getAnimation(animation)} transition={getTransition(animation)} className={`card ${className}`} style={style} id={id} name={name}>
      {children}
    </motion.div>
  );
};

Card.defaultName = "Card";

Card.defaultProps = {
  className: "",
  animation: "",
  id: "",
  name: "",
  style: {},
}

/*Card.checkPropTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element.isRequired()
}*/

export default Card;
