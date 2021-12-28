import React from "react";
import PropTypes from "prop-types";

// styles
import "./style.scss";

const Card = (props) => {
  const { children, className, id, name, style } = props;

  return (
    <div className={`card ${className}`} style={style} id={id} name={name}>
      {children}
    </div>
  );
};

Card.defaultName = "Card";

Card.defaultProps = {
  className: "",
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
