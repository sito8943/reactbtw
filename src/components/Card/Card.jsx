import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// styles
import "./style.scss";

const Card = (props) => {
  const { children, className, id, name, style, animation } = props;

  /**
   * @param {string} animation
   */
  const getAnimation = (animation) => {
    switch (animation) {
      default:
        return { 
          rotate: 0, 
          scale: 1 
        };
    }
  }

  const getTransition = (animation) => {
    switch (animation) {
      default:
        return {
          type: "spring",
          stiffness: 260,
          damping: 20
        };
    }
  }

  /**
   * @param {string} animation
   */
  const getInitial = (animation) => {
    switch (animation) {
      default:
        return { scale: 0 };
    }
  }

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
